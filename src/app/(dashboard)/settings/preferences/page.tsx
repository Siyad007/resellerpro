'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTheme } from 'next-themes'

export default function PreferencesPage() {
  const { theme, setTheme } = useTheme()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>
          Customize the app's appearance and behavior.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <Label>Appearance</Label>
          <Select onValueChange={setTheme} defaultValue={theme}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Email Notifications</Label>
          <div className="flex items-center space-x-2">
            <Switch id="email-new-order" defaultChecked />
            <Label htmlFor="email-new-order">New order notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="email-summary" />
            <Label htmlFor="email-summary">Weekly summary reports</Label>
          </div>
        </div>

        <Button>Save Preferences</Button>
      </CardContent>
    </Card>
  )
}