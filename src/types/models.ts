export interface UserProfile {
  id: string
  fullName: string
  businessName?: string
  email: string
  phone?: string
  avatarUrl?: string
}

export interface Subscription {
  planId: 'free' | 'starter' | 'professional' | 'business'
  status: 'active' | 'trialing' | 'canceled' | 'past_due'
  currentPeriodEnd: string
  ordersThisMonth: number
  orderLimit: number | null
}

export interface Product {
  id: string
  name: string
  imageUrl?: string
  costPrice: number
  sellingPrice: number
  category?: string
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock'
  description?: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  state?: string
  pincode?: string
  totalOrders: number
  totalSpent: number
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
}

export interface Order {
  id: string
  orderNumber: number
  customerId: string
  customerName: string

  items: OrderItem[]
  
  subtotal: number
  shipping: number
  discount: number
  total: number
  profit: number
  
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'cod' | 'refunded'
  paymentMethod?: string
  
  createdAt: string
  updatedAt: string
}