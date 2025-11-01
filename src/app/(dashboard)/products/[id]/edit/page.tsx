import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EditProductForm from './EditProductForm'

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params 

  const supabase = await createClient()
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !product) return notFound()

  return <EditProductForm product={product} />
}
