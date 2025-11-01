export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Package } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function ProductDetailsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params 

  const supabase = await createClient()
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !product) return notFound()

  const profit = product.selling_price - product.cost_price
  const profitMargin = ((profit / product.selling_price) * 100).toFixed(1)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
          <p className="text-muted-foreground">Product ID: {id}</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 grid md:grid-cols-2 gap-6">
          {product.image_url ? (
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image src={product.image_url} alt={product.name} fill className="object-cover" />
            </div>
          ) : (
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <Package className="h-32 w-32 text-muted-foreground/20" />
            </div>
          )}

          <div className="space-y-4">
            <Badge>{product.category || 'Uncategorized'}</Badge>
            <p className="text-muted-foreground">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">Cost Price</p>
                <p className="text-lg font-semibold">₹{product.cost_price}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Selling Price</p>
                <p className="text-lg font-semibold text-primary">₹{product.selling_price}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Profit</p>
                <p className="text-lg font-semibold text-green-600">₹{profit}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stock Status</p>
                <Badge
                  className={
                    product.stock_status === 'in_stock'
                      ? 'bg-green-500 text-white'
                      : product.stock_status === 'low_stock'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-red-500 text-white'
                  }
                >
                  {product.stock_status.replace('_', ' ')}
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button className="w-full" asChild>
                <Link href={`/products/${id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Product
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
