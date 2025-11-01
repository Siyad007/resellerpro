import { getProducts } from './actions'
import ProductsClient from './product-client'

export default async function ProductsPage() {
  // Fetch data on the server
  const initialData = await getProducts()

  return <ProductsClient initialData={initialData} />
}