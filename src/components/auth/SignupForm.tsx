'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Loader2, Mail, Lock, User, Briefcase, Sparkles, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'

export default function SignupForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string>('')
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
    agreeToTerms: false,
  })

  const supabase = createClient()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeToTerms) {
      toast({ 
        title: 'Terms Required', 
        description: 'Please accept the terms and conditions.', 
        variant: 'destructive' 
      })
      return
    }

    setIsLoading(true)
    setDebugInfo('Starting signup...')

    try {
      // Check environment variables
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      console.log('=== DEBUG INFO ===')
      console.log('Supabase URL:', supabaseUrl)
      console.log('Supabase Key exists:', !!supabaseKey)
      console.log('Supabase Key length:', supabaseKey?.length)
      console.log('Form Data:', {
        email: formData.email,
        phone: formData.phone,
        fullName: formData.fullName,
        businessName: formData.businessName,
        passwordLength: formData.password.length
      })

      if (!supabaseUrl || !supabaseKey) {
        const error = 'Missing Supabase environment variables!'
        console.error('❌', error)
        setDebugInfo(error)
        toast({ 
          title: 'Configuration Error', 
          description: error, 
          variant: 'destructive' 
        })
        setIsLoading(false)
        return
      }

      setDebugInfo('Calling Supabase signUp...')
      
      // Try the simplest possible signup first
      const signUpPayload = {
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            business_name: formData.businessName || null,
            phone: formData.phone,
          },
        },
      }

      console.log('SignUp Payload:', JSON.stringify(signUpPayload, null, 2))

      const { data: authData, error: signUpError } = await supabase.auth.signUp(signUpPayload)

      console.log('=== RESPONSE ===')
      console.log('Auth Data:', authData)
      console.log('Error:', signUpError)

      if (signUpError) {
        console.error('❌ Signup error:', signUpError)
        setDebugInfo(`Error: ${signUpError.message}`)
        
        // Show more detailed error info
        toast({ 
          title: 'Signup Failed', 
          description: `${signUpError.message} (Status: ${signUpError.status || 'unknown'})`, 
          variant: 'destructive' 
        })
        setIsLoading(false)
        return
      }

      if (!authData.user) {
        console.error('❌ No user returned')
        setDebugInfo('No user returned from Supabase')
        toast({ 
          title: 'Signup Failed', 
          description: 'No user data returned. Please try again.', 
          variant: 'destructive' 
        })
        setIsLoading(false)
        return
      }

      console.log('✅ Success! User ID:', authData.user.id)
      setDebugInfo('Success! Redirecting...')

      toast({ 
        title: 'Account Created! 🎉', 
        description: 'Welcome to ResellerPro.',
      })

      setTimeout(() => {
        router.push('/dashboard')
        router.refresh()
      }, 1000)

    } catch (error: any) {
      console.error('❌ Caught error:', error)
      console.error('Error details:', {
        message: error?.message,
        name: error?.name,
        stack: error?.stack,
      })
      
      setDebugInfo(`Caught error: ${error?.message || 'Unknown error'}`)
      
      toast({ 
        title: 'Signup Failed', 
        description: error?.message || 'An unexpected error occurred.', 
        variant: 'destructive' 
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <Card className="w-full max-w-md relative z-10 border-2">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Sparkles className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
            <CardDescription className="text-base">Start your reselling journey today</CardDescription>
          </div>
          
          {debugInfo && (
            <div className="text-xs text-left bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <strong>Debug:</strong> {debugInfo}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  id="fullName" 
                  placeholder="Rahul Kumar" 
                  className="pl-10" 
                  value={formData.fullName} 
                  onChange={handleInputChange} 
                  required 
                  disabled={isLoading} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name (Optional)</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  id="businessName" 
                  placeholder="Rahul's Store" 
                  className="pl-10" 
                  value={formData.businessName} 
                  onChange={handleInputChange} 
                  disabled={isLoading} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  className="pl-10" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  disabled={isLoading} 
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="9876543210" 
                  className="pl-10" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  required 
                  disabled={isLoading} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  id="password" 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="At least 6 characters" 
                  className="pl-10 pr-10" 
                  value={formData.password} 
                  onChange={handleInputChange} 
                  required 
                  disabled={isLoading} 
                  minLength={6}
                  autoComplete="new-password"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={formData.agreeToTerms} 
                onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })} 
                disabled={isLoading} 
              />
              <label 
                htmlFor="terms" 
                className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Creating account...
                </>
              ) : (
                'Create Free Account'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}