import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DateRangePicker } from '@/components/analytics/DateRangePicker'
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  BarChart,
  Package,
  ArrowRight,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'

export const metadata = {
  title: 'Analytics - ResellerPro',
  description: 'Detailed analytics and reports for your business',
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Get insights into your business performance.
          </p>
        </div>
        <DateRangePicker />
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="₹3,24,500"
          change="+18.2% from last month"
          icon={DollarSign}
        />
        <StatsCard
          title="Total Profit"
          value="₹1,94,700"
          change="+21.5% from last month"
          icon={TrendingUp}
        />
        <StatsCard
          title="Total Orders"
          value="217"
          change="+12 from last month"
          icon={ShoppingCart}
        />
        <StatsCard
          title="Avg. Order Value"
          value="₹1,495"
          change="-2.1% from last month"
          trend="down"
          icon={Users}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales & Profit Trend</CardTitle>
            <CardDescription>Performance over the selected period.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartPlaceholder title="Sales & Profit Line Chart" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>How your product categories are performing.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartPlaceholder title="Revenue Bar Chart" />
          </CardContent>
        </Card>
      </div>

      {/* Top Performers Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        <TopPerformersCard
          title="Top Selling Products"
          description="Your best performers by revenue."
          icon={Package}
          items={[
            { name: 'Wireless Earbuds', value: '₹58,455', progress: 95 },
            { name: 'Power Banks', value: '₹41,979', progress: 80 },
            { name: 'Phone Cases', value: '₹25,568', progress: 65 },
            { name: 'LED Strip Lights', value: '₹25,172', progress: 60 },
            { name: 'Bluetooth Speakers', value: '₹18,900', progress: 45 },
          ]}
          viewAllHref="/products"
        />

        <TopPerformersCard
          title="Top Customers"
          description="Your most valuable customers by spending."
          icon={User}
          items={[
            { name: 'Amit Kumar', value: '₹67,890', progress: 100 },
            { name: 'Rahul Sharma', value: '₹45,680', progress: 85 },
            { name: 'Priya Singh', value: '₹24,500', progress: 60 },
            { name: 'Karan Mehta', value: '₹18,900', progress: 40 },
            { name: 'Sneha Patel', value: '₹12,340', progress: 25 },
          ]}
          viewAllHref="/customers"
        />
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  trend = 'up',
}: {
  title: string
  value: string
  change: string
  icon: any
  trend?: 'up' | 'down'
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`text-xs text-muted-foreground ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change}
        </p>
      </CardContent>
    </Card>
  )
}

function ChartPlaceholder({ title }: { title: string }) {
  return (
    <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/50">
      <div className="text-center text-muted-foreground">
        <BarChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="font-semibold">{title}</p>
        <p className="text-sm">Chart will be rendered here</p>
      </div>
    </div>
  )
}

function TopPerformersCard({
  title,
  description,
  icon: Icon,
  items,
  viewAllHref,
}: {
  title: string
  description: string
  icon: any
  items: { name: string; value: string; progress: number }[]
  viewAllHref: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{item.name}</span>
              <span className="text-muted-foreground">{item.value}</span>
            </div>
            <Progress value={item.progress} />
          </div>
        ))}
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link href={viewAllHref}>
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}