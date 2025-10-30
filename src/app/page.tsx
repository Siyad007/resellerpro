import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Package,
  BarChart3,
  ArrowRight,
  Check,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">ResellerPro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          <Badge className="px-4 py-1.5 text-sm">
            <Sparkles className="mr-2 h-3 w-3" />
            Trusted by 10,000+ resellers
          </Badge>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Manage Your Reselling Business Like a Pro
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Complete order management, customer tracking, and analytics for WhatsApp/Instagram
            resellers. Start free, scale unlimited.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Free forever plan
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-24 bg-muted/50">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Everything you need to grow
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed specifically for resellers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Package}
            title="Product Management"
            description="Organize products with images, pricing, and profit calculations. Know exactly what you're earning."
          />
          <FeatureCard
            icon={Users}
            title="Customer Database"
            description="Save customer details once, reuse forever. Track order history and build relationships."
          />
          <FeatureCard
            icon={Zap}
            title="Smart WhatsApp Paste"
            description="Copy customer messages from WhatsApp, paste in app. Auto-extract name, phone, address!"
          />
          <FeatureCard
            icon={BarChart3}
            title="Analytics & Reports"
            description="Daily, weekly, monthly reports. See what's selling, who's buying, and how much you're earning."
          />
          <FeatureCard
            icon={Shield}
            title="Secure & Private"
            description="Your data is encrypted and safe. We never share your information with anyone."
          />
          <FeatureCard
            icon={TrendingUp}
            title="Scale Unlimited"
            description="Start with 10 orders/month free. Upgrade as you grow. No limits on success."
          />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container py-24">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free, upgrade when you're ready
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          <PricingCard
            name="Free"
            price="₹0"
            description="Perfect for getting started"
            features={[
              'Up to 10 orders/month',
              'All core features',
              'Email support',
              'Mobile app access',
            ]}
          />
          <PricingCard
            name="Professional"
            price="₹999"
            description="For growing businesses"
            popular
            features={[
              'Unlimited orders',
              'All features',
              'Priority support',
              'Analytics dashboard',
              'Smart paste feature',
              'Remove branding',
            ]}
          />
          <PricingCard
            name="Business"
            price="₹1,999"
            description="For power users"
            features={[
              'Everything in Pro',
              '10 team members',
              'API access',
              'Custom integrations',
              'Dedicated support',
              'White-label option',
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container py-24">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to grow your business?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Join thousands of successful resellers who trust ResellerPro to manage their business.
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-bold">ResellerPro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Manage your reselling business like a pro
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
                <li><Link href="#demo">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 ResellerPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any
  title: string
  description: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function PricingCard({
  name,
  price,
  description,
  features,
  popular,
}: {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
}) {
  return (
    <Card className={popular ? 'border-primary shadow-lg scale-105' : ''}>
      <CardHeader>
        {popular && (
          <Badge className="w-fit mb-2">Most Popular</Badge>
        )}
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          {price !== '₹0' && <span className="text-muted-foreground">/month</span>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full" variant={popular ? 'default' : 'outline'} asChild>
          <Link href="/signup">Get Started</Link>
        </Button>
        <ul className="space-y-3 text-sm">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}