'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Save, Plus, Trash, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { SmartPasteDialog } from '@/components/customers/SmartPasteDialog'

export default function NewOrderPage() {
  const [items, setItems] = useState([{ id: 1, product: '', quantity: 1, price: 0 }])

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), product: '', quantity: 1, price: 0 }])
  }

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Create New Order</h1>
          <p className="text-muted-foreground">Select a customer and add products to create an order.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Customer Details</CardTitle>
                <CardDescription>Select an existing customer or add a new one.</CardDescription>
              </div>
              <SmartPasteDialog onDataConfirmed={() => {}} />
            </CardHeader>
            <CardContent>
              {/* Customer Selector Component would go here */}
              <p className="text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">Customer Selector Component</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-end gap-2">
                  <div className="flex-1 space-y-2">
                    <Label>Product</Label>
                    {/* Product Selector Component would go here */}
                    <Input placeholder="Search for a product..." />
                  </div>
                  <div className="space-y-2 w-20">
                    <Label>Qty</Label>
                    <Input type="number" defaultValue={1} />
                  </div>
                  <div className="space-y-2 w-32">
                    <Label>Price</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={handleAddItem}>
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </CardContent>
          </Card>
        </form>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹1,698</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>₹50</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount</span>
                <span className="text-red-500">-₹100</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹1,648</span>
                </div>
                <div className="flex justify-between text-sm text-green-600 font-medium">
                  <span>Profit</span>
                  <span>₹848</span>
                </div>
              </div>
              <Button size="lg" className="w-full mt-4">
                <Save className="mr-2 h-4 w-4" />
                Create Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}