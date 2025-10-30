import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, MessageSquare, Phone, DollarSign, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/customers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">AK</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Amit Kumar</h1>
            <p className="text-muted-foreground">Customer ID: {params.id}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><ShoppingCart className="h-4 w-4"/>Total Orders</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">23</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><DollarSign className="h-4 w-4"/>Total Spent</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold text-green-600">₹67,890</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Badge className="bg-purple-500 text-white">VIP</Badge>Status</CardTitle></CardHeader>
          <CardContent><p className="text-xl font-semibold">Valued Customer</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Phone</p>
            <p className="font-medium">9123456789</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">amit@example.com</p>
          </div>
          <div className="flex items-start justify-between">
            <p className="text-muted-foreground">Address</p>
            <p className="font-medium text-right">Tower 3, Apt 1502,<br/>Cyber City, Gurugram, HR - 122002</p>
          </div>
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" className="flex-1"><Phone className="mr-2 h-4 w-4"/>Call</Button>
            <Button className="flex-1"><MessageSquare className="mr-2 h-4 w-4"/>Message on WhatsApp</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>Recent orders from this customer</CardDescription>
        </CardHeader>
        <CardContent>
          {/* A simplified version of the OrderTable would go here */}
          <p className="text-center text-muted-foreground py-8">Order History Table Component</p>
        </CardContent>
      </Card>
    </div>
  )
}