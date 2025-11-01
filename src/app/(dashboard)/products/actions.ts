'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const ProductSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters.'),
  cost_price: z.coerce.number().min(0, 'Cost price must be a positive number.'),
  selling_price: z.coerce.number().min(0, 'Selling price must be a positive number.'),
  category: z.string().optional(),
  description: z.string().optional(),
  stock_status: z.enum(['in_stock', 'low_stock', 'out_of_stock']).default('in_stock'),
})

export type FormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function createProduct(
  prevState: FormState,
  formData: FormData
 ): Promise<FormState> {
  const supabase = await createClient()

  // Check user authentication
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: 'Authentication required.' }
  }

  // Validate data
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
      message: 'Invalid form data. Please fix errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Handle optional image upload
  const file = formData.get('image') as File | null
  let image_url: string | null = null

  if (file && file.size > 0) {
    const filePath = `products/${user.id}/${Date.now()}-${file.name}`
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Upload failed:', uploadError)
      return { success: false, message: 'Failed to upload image.' }
    }

    const { data: publicUrl } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath)

    image_url = publicUrl.publicUrl
  }

  // Insert into database
  const { error } = await supabase.from('products').insert({
    user_id: user.id,
    image_url,
    ...validatedFields.data,
  })

  if (error) {
    console.error('Supabase error:', error)
    return { success: false, message: 'Database Error: Failed to create product.' }
  }

  // Revalidate product list
  revalidatePath('/products')

  return {
    success: true,
    message: `Product "${validatedFields.data.name}" created successfully!`,
  }
}

// get all products
export async function getProducts() {
  const supabase = await createClient()

  // Get the logged-in user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { products: [], stats: { total: 0, value: 0, avgMargin: 0 } }

  // Fetch products
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return { products: [], stats: { total: 0, value: 0, avgMargin: 0 } }
  }

  // Compute stats
  const total = products.length
  const totalValue = products.reduce((sum, p) => sum + (p.selling_price ?? 0), 0)
  const avgMargin =
    products.length > 0
      ? (
          products.reduce((sum, p) => {
            const margin = ((p.selling_price - p.cost_price) / p.selling_price) * 100
            return sum + margin
          }, 0) / products.length
        ).toFixed(1)
      : 0

  return {
    products,
    stats: {
      total,
      value: totalValue,
      avgMargin,
    },
  }
}


// --- Update Product ---
// --- Update Product ---
export async function updateProduct(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient()

  // Extend schema for update
  const ProductUpdateSchema = ProductSchema.extend({
    id: z.string().uuid('Invalid product ID.'),
  })

  // Validate inputs
  const validated = ProductUpdateSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    cost_price: formData.get('cost_price'),
    selling_price: formData.get('selling_price'),
    category: formData.get('category'),
    description: formData.get('description'),
    stock_status: formData.get('stock_status'),
  })

  if (!validated.success) {
    return {
      success: false,
      message: 'Invalid form data.',
      errors: validated.error.flatten().fieldErrors,
    }
  }

  const { id, ...data } = validated.data

  // Handle optional image upload
  const file = formData.get('image') as File | null
  let image_url: string | null = null

  if (file && file.size > 0) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, message: 'Authentication required.' }
    }

    const filePath = `products/${user.id}/${Date.now()}-${file.name}`
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Image upload error:', uploadError)
      return { success: false, message: 'Failed to upload image.' }
    }

    const { data: publicUrl } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath)

    image_url = publicUrl.publicUrl
  }

  // Update product in Supabase
  const { error } = await supabase
    .from('products')
    .update({
      ...data,
      ...(image_url ? { image_url } : {}),
    })
    .eq('id', id)

  if (error) {
    console.error('Supabase update error:', error)
    return { success: false, message: 'Database update failed.' }
  }

  revalidatePath(`/products/${id}`)
  revalidatePath('/products')

  return {
    success: true,
    message: `Product "${data.name}" updated successfully!`,
  }
}
