'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// 1. Define the schema for product data using Zod for validation
const ProductSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters.'),
  cost_price: z.coerce.number().min(0, 'Cost price must be a positive number.'),
  selling_price: z.coerce.number().min(0, 'Selling price must be a positive number.'),
  category: z.string().optional(),
  description: z.string().optional(),
  stock_status: z.enum(['in_stock', 'low_stock', 'out_of_stock']).default('in_stock'),
})

// 2. Define the return type for our action
export type FormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

/**
 * Server Action to create a new product.
 */
export async function createProduct(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: 'Authentication required.' }
  }

  // Validate form data
  const validatedFields = ProductSchema.safeParse({
    name: formData.get('name'),
    cost_price: formData.get('cost_price'),
    selling_price: formData.get('selling_price'),
    category: formData.get('category'),
    description: formData.get('description'),
    stock_status: formData.get('stock_status'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check the errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Insert data into Supabase
  try {
    const { error } = await supabase.from('products').insert({
      ...validatedFields.data,
      user_id: user.id,
    })

    if (error) {
      console.error('Supabase error:', error)
      return { success: false, message: 'Database Error: Failed to create product.' }
    }

    // Revalidate the products page to show the new product
    revalidatePath('/products')
    
    return { success: true, message: `Product "${validatedFields.data.name}" created successfully!` }
  } catch (e) {
    return { success: false, message: 'An unexpected error occurred.' }
  }
}