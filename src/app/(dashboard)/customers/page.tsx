import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Plus, Search, Filter, Users, TrendingUp, DollarSign, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Customers - ResellerPro',
  description: 'Manage your customers',
}

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <Button asChild>
          <Link href="/customers/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Repeat Customers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64</div>
            <p className="text-xs text-muted-foreground">41% retention rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Avg. Customer Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹3,245</div>
            <p className="text-xs text-muted-foreground">Lifetime value</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search customers by name or phone..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Customers Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CustomerCard
          name="Rahul Sharma"
          phone="9876543210"
          email="rahul@example.com"
          orders={15}
          totalSpent={18750}
          lastOrder="2 days ago"
          type="vip"
        />
        <CustomerCard
          name="Priya Singh"
          phone="9988776655"
          email="priya@example.com"
          orders={8}
          totalSpent={12340}
          lastOrder="5 days ago"
          type="active"
        />
        <CustomerCard
          name="Amit Kumar"
          phone="9123456789"
          email="amit@example.com"
          orders={3}
          totalSpent={4560}
          lastOrder="1 week ago"
          type="active"
        />
        <CustomerCard
          name="Sneha Patel"
          phone="9876501234"
          email="sneha@example.com"
          orders={12}
          totalSpent={15890}
          lastOrder="1 day ago"
          type="vip"
        />
        <CustomerCard
          name="Karan Mehta"
          phone="9998887776"
          email="karan@example.com"
          orders={1}
          totalSpent={1299}
          lastOrder="2 months ago"
          type="inactive"
        />
        <CustomerCard
          name="Divya Reddy"
          phone="9123459876"
          email="divya@example.com"
          orders={6}
          totalSpent={8970}
          lastOrder="3 days ago"
          type="active"
        />
      </div>
    </div>
  )
}

function CustomerCard({
  name,
  phone,
  email,
  orders,
  totalSpent,
  lastOrder,
  type,
}: {
  name: string
  phone: string
  email: string
  orders: number
  totalSpent: number
  lastOrder: string
  type: 'vip' | 'active' | 'inactive'
}) {
  const typeConfig = {
    vip: { label: 'VIP', color: 'bg-purple-500' },
    active: { label: 'Active', color: 'bg-green-500' },
    inactive: { label: 'Inactive', color: 'bg-gray-400' },
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-xs text-muted-foreground">{lastOrder}</p>
            </div>
          </div>
          <Badge className={`${typeConfig[type].color} text-white border-0`}>
            {typeConfig[type].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{email}</span>
          </div>
        </div>

        <div className="pt-3 border-t grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Orders</p>
            <p className="text-lg font-bold">{orders}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Spent</p>
            <p className="text-lg font-bold text-green-600">₹{totalSpent.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1" asChild>
            <Link href={`/customers/${name}`}>View Details</Link>
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <Link href={`/orders/new?customer=${name}`}>New Order</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}