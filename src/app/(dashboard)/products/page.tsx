import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Plus, Search, Filter, Package, TrendingUp, DollarSign } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Products - ResellerPro',
  description: 'Manage your products',
}

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link href="/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,45,000</div>
            <p className="text-xs text-muted-foreground">Inventory value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Avg. Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54%</div>
            <p className="text-xs text-muted-foreground text-green-600">+3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProductCard
          name="Wireless Earbuds"
          image="/placeholder-product.png"
          cost={600}
          price={1299}
          profit={699}
          stock="in_stock"
        />
        <ProductCard
          name="Phone Case (Black)"
          image="/placeholder-product.png"
          cost={150}
          price={399}
          profit={249}
          stock="in_stock"
        />
        <ProductCard
          name="LED Strip Lights"
          image="/placeholder-product.png"
          cost={400}
          price={899}
          profit={499}
          stock="low_stock"
        />
        <ProductCard
          name="Power Bank 20000mAh"
          image="/placeholder-product.png"
          cost={1200}
          price={2499}
          profit={1299}
          stock="in_stock"
        />
        <ProductCard
          name="Bluetooth Speaker"
          image="/placeholder-product.png"
          cost={800}
          price={1699}
          profit={899}
          stock="in_stock"
        />
        <ProductCard
          name="Phone Ring Holder"
          image="/placeholder-product.png"
          cost={50}
          price={199}
          profit={149}
          stock="out_of_stock"
        />
      </div>
    </div>
  )
}

function ProductCard({
  name,
  image,
  cost,
  price,
  profit,
  stock,
}: {
  name: string
  image: string
  cost: number
  price: number
  profit: number
  stock: 'in_stock' | 'low_stock' | 'out_of_stock'
}) {
  const stockConfig = {
    in_stock: { label: 'In Stock', color: 'bg-green-500' },
    low_stock: { label: 'Low Stock', color: 'bg-yellow-500' },
    out_of_stock: { label: 'Out of Stock', color: 'bg-red-500' },
  }

  const profitMargin = ((profit / price) * 100).toFixed(1)

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer">
      <div className="aspect-square relative bg-muted">
        <div className="absolute top-2 right-2 z-10">
          <Badge className={`${stockConfig[stock].color} text-white border-0`}>
            {stockConfig[stock].label}
          </Badge>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <Package className="h-20 w-20 text-muted-foreground/20" />
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-base line-clamp-2">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Cost</p>
            <p className="font-medium">₹{cost}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="font-medium">₹{price}</p>
          </div>
        </div>
        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Profit</p>
              <p className="font-bold text-green-600">₹{profit}</p>
            </div>
            <Badge variant="secondary">{profitMargin}%</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}