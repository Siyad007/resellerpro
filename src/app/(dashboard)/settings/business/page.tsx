import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export const metadata = {
  title: 'Business Settings - ResellerPro',
}

export default function BusinessPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Information</CardTitle>
        <CardDescription>
          Update your business details. This will appear on invoices.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input id="businessName" defaultValue="Rahul's Gadget Store" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gstNumber">GSTIN (Optional)</Label>
          <Input id="gstNumber" placeholder="e.g., 29ABCDE1234F1Z5" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessAddress">Business Address</Label>
          <Textarea id="businessAddress" placeholder="Your business address for invoices" />
        </div>
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  )
}