import { Card, CardContent } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Invoice - ResellerPro',
}

export default function InvoicePage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-muted/30 p-8 print:p-0">
      <Card className="max-w-3xl mx-auto p-8 print:shadow-none print:border-none print:p-0">
        <CardContent>
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h1 className="text-2xl font-bold">ResellerPro</h1>
              </div>
              <p className="text-muted-foreground text-sm">Your Business Address Here</p>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-bold text-muted-foreground">INVOICE</h2>
              <p className="text-muted-foreground">#{params.id}</p>
              <p className="text-muted-foreground">Date: Jan 20, 2024</p>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">BILL TO</h3>
            <p className="font-semibold">Rahul Sharma</p>
            <p>Flat 201, Galaxy Apartments</p>
            <p>Sector 15, Noida, UP - 110019</p>
            <p>9876543210</p>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr className="border-b">
                  <th className="p-3 text-left font-medium">Item</th>
                  <th className="p-3 text-center font-medium">Quantity</th>
                  <th className="p-3 text-right font-medium">Unit Price</th>
                  <th className="p-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Wireless Earbuds</td>
                  <td className="p-3 text-center">1</td>
                  <td className="p-3 text-right">₹1,299</td>
                  <td className="p-3 text-right">₹1,299</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Phone Case (Black)</td>
                  <td className="p-3 text-center">3</td>
                  <td className="p-3 text-right">₹399</td>
                  <td className="p-3 text-right">₹1,197</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mt-8">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>₹2,496</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>₹50</span></div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹2,546</span></div>
              <div className="flex justify-between"><span>Amount Paid</span><span>₹2,546</span></div>
              <div className="flex justify-between font-bold"><span>Amount Due</span><span>₹0</span></div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center text-sm text-muted-foreground">
            <p>Thank you for your business!</p>
            <p>If you have any questions, please contact us at support@resellerpro.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}