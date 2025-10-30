'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// Define the schema for signup data
const SignupSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters.'),
  businessName: z.string().optional(),
  email: z.string().email('Invalid email address.'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})

export type SignupFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

/**
 * Server Action to handle the entire user signup process.
 */
export async function signup(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const supabase = await createClient()

  // 1. Validate form data
  const validatedFields = SignupSchema.safeParse({
    fullName: formData.get('fullName'),
    businessName: formData.get('businessName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password, fullName, businessName, phone } = validatedFields.data

  // 2. Sign up the user in Supabase Auth
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    phone, // Pass phone directly to auth
    options: {
      data: {
        // This metadata is now used by our manual insert
        full_name: fullName,
        business_name: businessName,
      },
    },
  })

  if (signUpError) {
    return { success: false, message: signUpError.message }
  }

  if (!authData.user) {
    return { success: false, message: 'Signup failed: User not created.' }
  }

  // 3. Manually insert into the 'profiles' table
  // This replaces the old trigger logic
  const { error: profileError } = await supabase.from('profiles').insert({
    id: authData.user.id,
    full_name: fullName,
    business_name: businessName,
    email: email,
    phone: phone,
  })

  if (profileError) {
    // If profile creation fails, we should ideally delete the auth user
    // to prevent orphaned accounts.
    await supabase.auth.admin.deleteUser(authData.user.id)
    return { success: false, message: `Profile creation failed: ${profileError.message}` }
  }

  // 4. Manually insert into the 'subscriptions' table
  const { error: subError } = await supabase.from('subscriptions').insert({
    user_id: authData.user.id,
    plan_name: 'free',
    status: 'active',
    monthly_order_limit: 10,
  })

  if (subError) {
    await supabase.auth.admin.deleteUser(authData.user.id)
    return { success: false, message: `Subscription setup failed: ${subError.message}` }
  }

  // If all steps are successful, revalidate and redirect
  revalidatePath('/', 'layout')
  redirect('/onboarding') // Redirect to onboarding after successful signup
}