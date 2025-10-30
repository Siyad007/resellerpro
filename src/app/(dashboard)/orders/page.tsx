import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Search, Filter, ShoppingCart, Clock, Package, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Orders - ResellerPro',
  description: 'Manage your orders',
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Track and manage all your orders</p>
        </div>
        <Button asChild>
          <Link href="/orders/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Order
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">217</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Shipped</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">In transit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">180</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search orders by ID, customer, or product..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <OrderCard
            orderId="#1234"
            customer="Rahul Sharma"
            products="Wireless Earbuds × 1"
            amount={1299}
            profit={699}
            date="15 Jan 2025"
            status="pending"
          />
          <OrderCard
            orderId="#1233"
            customer="Priya Singh"
            products="Phone Case × 3"
            amount={2997}
            profit={1347}
            date="15 Jan 2025"
            status="delivered"
          />
          <OrderCard
            orderId="#1232"
            customer="Amit Kumar"
            products="LED Strip, Power Bank"
            amount={4398}
            profit={2398}
            date="14 Jan 2025"
            status="shipped"
          />
          <OrderCard
            orderId="#1231"
            customer="Sneha Patel"
            products="Bluetooth Speaker × 2"
            amount={3398}
            profit={1798}
            date="14 Jan 2025"
            status="delivered"
          />
          <OrderCard
            orderId="#1230"
            customer="Karan Mehta"
            products="Phone Ring Holder × 5"
            amount={995}
            profit={745}
            date="13 Jan 2025"
            status="pending"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OrderCard({
  orderId,
  customer,
  products,
  amount,
  profit,
  date,
  status,
}: {
  orderId: string
  customer: string
  products: string
  amount: number
  profit: number
  date: string
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
}) {
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' },
    shipped: { label: 'Shipped', color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-50' },
    delivered: { label: 'Delivered', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50' },
    cancelled: { label: 'Cancelled', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' },
  }

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">{orderId}</h3>
              <Badge className={`${statusConfig[status].color} text-white border-0`}>
                {statusConfig[status].label}
              </Badge>
            </div>

            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Customer:</span>
                <span className="font-medium">{customer}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Products:</span>
                <span>{products}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Date:</span>
                <span>{date}</span>
              </div>
            </div>
          </div>

          <div className="text-right space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold">₹{amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your Profit</p>
              <p className="text-lg font-bold text-green-600">₹{profit.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button size="sm" variant="outline" asChild>
            <Link href={`/orders/${orderId}`}>View Details</Link>
          </Button>
          <Button size="sm" variant="outline">Update Status</Button>
          <Button size="sm" variant="outline">Send Invoice</Button>
        </div>
      </CardContent>
    </Card>
  )
}