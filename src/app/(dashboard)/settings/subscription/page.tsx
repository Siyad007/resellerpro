import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Zap } from 'lucide-react'

export const metadata = {
  title: 'Subscription - ResellerPro',
}

export default function SubscriptionPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>
          Manage your subscription and billing details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 border rounded-lg bg-muted/50">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                Your Current Plan: <span className="text-primary">Free</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Renews on February 15, 2025
              </p>
            </div>
            <Badge>Active</Badge>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Orders this month</span>
              <span>8 / 10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              You've used 80% of your free orders. Upgrade for unlimited!
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Upgrade to unlock more features</h3>
          <p className="text-sm text-muted-foreground">
            Get unlimited orders, WhatsApp automation, and priority support.
          </p>
        </div>
        <Button size="lg" className="w-full gap-2">
          <Zap className="h-4 w-4" />
          Upgrade to Professional
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm border-t pt-6">
        <p className="text-muted-foreground">Need to cancel?</p>
        <Button variant="destructive" size="sm">
          Cancel Subscription
        </Button>
      </CardFooter>
    </Card>
  )
}