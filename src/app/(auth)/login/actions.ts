'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { revalidatePath as nextRevalidatePath } from 'next/cache'

const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
})

export type LoginFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[] | undefined>
}

export async function login(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const supabase = await createClient()

  // Debugging log to confirm environment variables are loaded
  console.log('Server Action: SUPABASE_URL is', process.env.SUPABASE_URL ? 'loaded' : 'MISSING');

  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message === 'Invalid login credentials') {
      return { success: false, message: 'Incorrect email or password. Please try again.' }
    }
    // For any other error
    return { success: false, message: `An error occurred: ${error.message}` }
  }

  // On success, invalidate path and redirect
  nextRevalidatePath('/')
  redirect('/dashboard')
  return { success: true, message: 'Logged in.' }
}
