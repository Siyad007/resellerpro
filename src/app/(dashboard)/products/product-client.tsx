'use client'

import { useState, useTransition } from 'react'
import { getProducts } from './actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Search, Filter, Package, TrendingUp, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from '@/components/ui/product-card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Product = {
  id: string
  name: string
  image_url: string | null
  cost_price: number
  selling_price: number
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock'
}

type Stats = {
  total: number
  value: number
  avgMargin: number | string
}

type ProductsClientProps = {
  initialData: {
    products: Product[]
    stats: Stats
  }
}

export default function ProductsClient({ initialData }: ProductsClientProps) {
  const [products, setProducts] = useState<Product[]>(initialData.products)
  const [stats, setStats] = useState<Stats>(initialData.stats)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [isPending, startTransition] = useTransition()

  const loadProducts = async (s?: string, c?: string) => {
    startTransition(async () => {
      const { products, stats } = await getProducts(s, c)
      setProducts(products)
      setStats(stats)
    })
  }

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
        <StatCard 
          title="Total Products" 
          icon={Package} 
          value={stats.total} 
          subtitle="+12 from last month" 
        />
        <StatCard 
          title="Total Value" 
          icon={DollarSign} 
          value={`₹${stats.value.toLocaleString()}`} 
          subtitle="Inventory value" 
        />
        <StatCard 
          title="Avg. Profit Margin" 
          icon={TrendingUp} 
          value={`${stats.avgMargin}%`} 
          subtitle="Compared to last month" 
        />
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') loadProducts(search, category)
            }}
          />
        </div>

        <Select
          value={category}
          onValueChange={(val) => {
            setCategory(val)
            loadProducts(search, val)
          }}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="home">Home & Living</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={() => loadProducts(search, category)}>
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isPending ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : products.length > 0 ? (
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
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ 
  title, 
  icon: Icon, 
  value, 
  subtitle 
}: { 
  title: string
  icon: any
  value: string | number
  subtitle: string 
}) {
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