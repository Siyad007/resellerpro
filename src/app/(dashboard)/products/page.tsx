import { getProducts } from './actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Plus, Search, Filter, Package, TrendingUp, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from '@/components/ui/product-card'

export const metadata = {
  title: 'Products - ResellerPro',
  description: 'Manage your products',
}

export default async function ProductsPage() {
  const { products, stats } = await getProducts()

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
        <StatCard title="Total Products" icon={Package} value={stats.total} subtitle="+12 from last month" />
        <StatCard title="Total Value" icon={DollarSign} value={`₹${stats.value.toLocaleString()}`} subtitle="Inventory value" />
        <StatCard title="Avg. Profit Margin" icon={TrendingUp} value={`${stats.avgMargin}%`} subtitle="Compared to last month" />
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
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              id={product.id}
              key={product.id}
              name={product.name}
              image={product.image_url || '/placeholder-product.png'}
              cost={product.cost_price}
              price={product.selling_price}
              profit={product.selling_price - product.cost_price}
              stock={product.stock_status}
            />
          ))
        ) : (
          <p className="text-muted-foreground">No products found.</p>
        )}
      </div>
    </div>
  )
}

function StatCard({ title, icon: Icon, value, subtitle }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  )
}
