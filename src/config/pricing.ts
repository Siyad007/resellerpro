export const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Up to 10 orders/month',
      'Basic product & customer management',
      'Email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 999,
    interval: 'month',
    description: 'For growing businesses',
    popular: true,
    features: [
      'Unlimited orders',
      'Smart WhatsApp Paste',
      'Analytics & Reports',
      'Priority WhatsApp support',
      'Remove ResellerPro branding',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    price: 1999,
    interval: 'month',
    description: 'For teams & power users',
    features: [
      'Everything in Professional',
      'Up to 5 team members',
      'API access',
      'Dedicated support manager',
    ],
  },
]