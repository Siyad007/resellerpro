import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch customer data here using the id
  const customerData = {
    name: 'Amit Kumar',
    phone: '9123456789',
    whatsapp: '9123456789',
    email: 'amit@example.com',
    addressLine1: 'Tower 3, Apt 1502',
    addressLine2: 'Cyber City',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122002',
    notes: 'Prefers fast delivery. VIP customer.',
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/customers/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Edit Customer</h1>
          <p className="text-muted-foreground">Update details for {customerData.name}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={customerData.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue={customerData.phone} />
              </div>
            </div>
            {/* ... other form fields similar to new/page.tsx, but with defaultValue */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" asChild>
                <Link href={`/customers/${params.id}`}>Cancel</Link>
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}