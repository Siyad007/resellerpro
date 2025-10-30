import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Printer,
  Download,
  Package,
  User,
  MapPin,
  Truck,
  CheckCircle2,
  CreditCard,
  MessageSquare,
  Phone,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Order Details - ResellerPro',
}

const mockOrder = {
  id: '1234',
  date: '2024-01-20T10:30:00Z',
  customer: {
    name: 'Rahul Sharma',
    phone: '9876543210',
    email: 'rahul.sharma@example.com',
    address: 'Flat 201, Galaxy Apartments',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '110019',
  },
  items: [
    { id: 'p1', name: 'Wireless Earbuds', quantity: 1, price: 1299, image: '/placeholder-product.png' },
    { id: 'p2', name: 'Phone Case (Black)', quantity: 3, price: 399, image: '/placeholder-product.png' },
  ],
  status: 'pending',
  payment: {
    status: 'paid',
    method: 'UPI',
  },
  pricing: {
    subtotal: 2496,
    shipping: 50,
    discount: 0,
    total: 2546,
    profit: 1246,
  },
  timeline: [
    { status: 'Order Placed', date: 'Jan 20, 2024, 10:30 AM', active: true },
    { status: 'Payment Received', date: 'Jan 20, 2024, 10:32 AM', active: true },
    { status: 'Processing', date: null, active: false },
    { status: 'Shipped', date: null, active: false },
    { status: 'Delivered', date: null, active: false },
  ],
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = { ...mockOrder, id: params.id }

  const statusConfig: any = {
    pending: { label: 'Pending', color: 'bg-yellow-500' },
    processing: { label: 'Processing', color: 'bg-blue-500' },
    shipped: { label: 'Shipped', color: 'bg-purple-500' },
    delivered: { label: 'Delivered', color: 'bg-green-500' },
    cancelled: { label: 'Cancelled', color: 'bg-red-500' },
  }

  const paymentConfig: any = {
    paid: { label: 'Paid', color: 'text-green-600' },
    pending: { label: 'Pending', color: 'text-yellow-600' },
    cod: { label: 'COD', color: 'text-orange-600' },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-8 w-8" asChild>
            <Link href="/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Order #{order.id}</h1>
            <p className="text-sm text-muted-foreground">
              Placed on {new Date(order.date).toLocaleDateString('en-IN', { dateStyle: 'long' })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Printer className="mr-2 h-4 w-4"/>Print</Button>
          <Button><Download className="mr-2 h-4 w-4"/>Download Invoice</Button>
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5"/>Order Items ({order.items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 py-4">
                    <div className="relative h-16 w-16 bg-muted rounded-md flex-shrink-0">
                      {/* Image would go here */}
                      <Package className="h-8 w-8 text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">@ ₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardHeader className="border-t">
              <CardTitle>Pricing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{order.pricing.subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>₹{order.pricing.shipping.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Discount</span><span className="text-red-500">-₹{order.pricing.discount.toLocaleString()}</span></div>
              <Separator />
              <div className="flex justify-between font-bold text-base"><span>Total</span><span>₹{order.pricing.total.toLocaleString()}</span></div>
              <div className="flex justify-between font-medium text-green-600"><span>Profit</span><span>₹{order.pricing.profit.toLocaleString()}</span></div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5"/>Order Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="relative pl-4">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
                {order.timeline.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 mb-6 last:mb-0">
                    <div className={`relative z-10 h-5 w-5 rounded-full flex items-center justify-center ${step.active ? 'bg-primary' : 'bg-muted border-2'}`}>
                      {step.active && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <div className="flex-1 -mt-1">
                      <p className={`font-semibold ${step.active ? '' : 'text-muted-foreground'}`}>{step.status}</p>
                      {step.date && <p className="text-xs text-muted-foreground">{step.date}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5"/>Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="font-semibold">{order.customer.name}</div>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>{order.customer.address}</p>
                <p>{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
              </div>
              <Separator />
              <div className="text-sm space-y-2">
                <p className="flex items-center gap-2"><MessageSquare className="h-4 w-4"/>{order.customer.phone}</p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4"/>{order.customer.email}</p>
              </div>
              <Button variant="outline" className="w-full" asChild><Link href={`/customers/${order.customer.name}`}>View Customer</Link></Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5"/>Payment & Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Order Status</span>
                <Badge className={`${statusConfig[order.status].color} text-white`}>
                  {statusConfig[order.status].label}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Payment Status</span>
                <span className={`font-semibold ${paymentConfig[order.payment.status].color}`}>
                  {paymentConfig[order.payment.status].label}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Payment Method</span>
                <span className="text-muted-foreground">{order.payment.method}</span>
              </div>
              <Button className="w-full">Update Status</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}