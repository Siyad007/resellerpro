'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// ✅ Define the validation schema
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
 * Handles the complete signup process.
 * ✅ Creates the user via Supabase Auth
 * ✅ Database trigger auto-creates profile + subscription
 */
export async function signup(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const supabase = await createClient()

  // 1️⃣ Validate form input
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

  // 2️⃣ Sign up the user in Supabase Auth
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        business_name: businessName,
        phone,
      },
    },
  })

  // 3️⃣ Handle signup errors
  if (signUpError) {
    return { success: false, message: signUpError.message }
  }

  if (!authData.user) {
    return { success: false, message: 'Signup failed: User not created.' }
  }

  // 4️⃣ Success — triggers in Supabase create profile & subscription automatically
 revalidatePath('/', 'layout')
 redirect('/dashboard')

  return { success: true, message: 'Signup successful!' }
}
