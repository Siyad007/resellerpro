import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, BarChart, DollarSign, Package } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Wireless Earbuds</h1>
          <p className="text-muted-foreground">Product ID: {params.id}</p>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6 grid md:grid-cols-2 gap-6">
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <Package className="h-32 w-32 text-muted-foreground/20" />
          </div>
          <div className="space-y-4">
            <Badge>Electronics</Badge>
            <h2 className="text-3xl font-bold">Wireless Earbuds</h2>
            <p className="text-muted-foreground">
              Premium Bluetooth 5.0 wireless earbuds with superior sound quality, active noise cancellation, and 20-hour battery life.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">Cost Price</p>
                <p className="text-lg font-semibold">₹600</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Selling Price</p>
                <p className="text-lg font-semibold text-primary">₹1,299</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Profit</p>
                <p className="text-lg font-semibold text-green-600">₹699</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stock Status</p>
                <Badge className="bg-green-500 text-white">In Stock</Badge>
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button className="w-full" asChild>
                <Link href={`/products/${params.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Product
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5"/>Sales Analytics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem title="Units Sold" value="45" />
          <StatItem title="Total Revenue" value="₹58,455" />
          <StatItem title="Total Profit" value="₹31,455" />
          <StatItem title="Avg. Profit Margin" value="53.8%" />
        </CardContent>
      </Card>
    </div>
  )
}

function StatItem({ title, value }: { title: string, value: string }) {
  return (
    <div className="p-4 bg-muted/50 rounded-lg">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}