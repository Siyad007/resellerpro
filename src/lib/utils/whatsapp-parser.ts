export interface ParsedCustomerData {
  name: string | null
  phone: string | null
  email: string | null
  addressLine1: string | null
  addressLine2: string | null
  city: string | null
  state: string | null
  pincode: string | null
  whatsapp: string | null
  confidence: number
  missingFields: string[]
}

/**
 * Extract customer data from WhatsApp message
 */
export function parseWhatsAppMessage(message: string): ParsedCustomerData {
  const normalized = message.trim()
  
  const result: ParsedCustomerData = {
    name: extractName(normalized),
    phone: extractPhone(normalized),
    email: extractEmail(normalized),
    addressLine1: null,
    addressLine2: null,
    city: null,
    state: null,
    pincode: extractPincode(normalized),
    whatsapp: null,
    confidence: 0,
    missingFields: [],
  }

  // Extract address
  const addressData = extractAddress(normalized, result.pincode)
  result.addressLine1 = addressData.line1
  result.addressLine2 = addressData.line2
  result.city = addressData.city
  result.state = addressData.state

  // WhatsApp same as phone
  result.whatsapp = result.phone

  // Calculate confidence
  const analysis = analyzeResults(result)
  result.confidence = analysis.confidence
  result.missingFields = analysis.missingFields

  return result
}

function extractPhone(text: string): string | null {
  const cleanText = text.replace(/flat|house|plot|room|floor|pin|pincode/gi, '')
  
  const patterns = [
    /(?:\+91|91)?[-.\s]?([6-9]\d{9})\b/,
    /\b([6-9]\d{9})\b/,
    /(?:phone|ph|mobile|mob|contact)[\s:]+(?:\+91|91)?[-.\s]?([6-9]\d{9})/i,
  ]

  for (const pattern of patterns) {
    const match = cleanText.match(pattern)
    if (match) {
      const digits = match[1].replace(/\D/g, '')
      if (digits.length === 10 && /^[6-9]/.test(digits)) {
        return digits
      }
    }
  }

  return null
}

function extractName(text: string): string | null {
  const patterns = [
    /(?:name|naam|नाम|customer)[\s:]+([A-Za-z\u0900-\u097F\s]{3,50})/i,
    /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/m,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      const name = match[1].trim()
      const words = name.split(/\s+/)
      if (words.length >= 2 && words.length <= 4) {
        return toTitleCase(name)
      }
    }
  }

  return null
}

function extractEmail(text: string): string | null {
  const pattern = /\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/
  const match = text.match(pattern)
  return match ? match[1].toLowerCase() : null
}

function extractPincode(text: string): string | null {
  const patterns = [
    /(?:pin|pincode|zip|postal)[\s:]+([1-9]\d{5})\b/i,
    /\b([1-9]\d{5})\b/,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match && /^[1-9]\d{5}$/.test(match[1])) {
      return match[1]
    }
  }

  return null
}

function extractAddress(text: string, pincode: string | null): {
  line1: string | null
  line2: string | null
  city: string | null
  state: string | null
} {
  let addressBlock = text

  const addressPatterns = [
    /(?:address|addr|add|delivery|पता)[\s:]+([^]*?)(?=\n(?:pin|city|state|thank|$))/i,
    /(?:flat|house|plot|building|apartment|tower|sector)(.+?)(?=\n(?:pin|city|state|$))/i,
  ]

  for (const pattern of addressPatterns) {
    const match = text.match(pattern)
    if (match) {
      addressBlock = match[1] || match[0]
      break
    }
  }

  const lines = addressBlock
    .split(/\n|,/)
    .map(line => line.trim())
    .filter(line => line.length > 3 && line.length < 200)

  return {
    line1: lines[0] || null,
    line2: lines[1] || null,
    city: extractCity(text),
    state: extractState(text),
  }
}

function extractCity(text: string): string | null {
  const cities = [
    'mumbai', 'delhi', 'bangalore', 'hyderabad', 'ahmedabad', 'chennai', 'kolkata',
    'pune', 'jaipur', 'lucknow', 'noida', 'gurugram', 'gurgaon', 'surat', 'indore'
  ]

  const normalized = text.toLowerCase()
  for (const city of cities) {
    if (normalized.includes(city)) {
      return toTitleCase(city)
    }
  }

  return null
}

function extractState(text: string): string | null {
  const states: Record<string, string> = {
    'maharashtra': 'Maharashtra',
    'delhi': 'Delhi',
    'karnataka': 'Karnataka',
    'telangana': 'Telangana',
    'gujarat': 'Gujarat',
    'tamil nadu': 'Tamil Nadu',
    'west bengal': 'West Bengal',
    'rajasthan': 'Rajasthan',
    'uttar pradesh': 'Uttar Pradesh',
    'up': 'Uttar Pradesh',
    'mp': 'Madhya Pradesh',
    'punjab': 'Punjab',
    'haryana': 'Haryana',
  }

  const normalized = text.toLowerCase()
  for (const [key, value] of Object.entries(states)) {
    const pattern = new RegExp(`\\b${key}\\b`, 'i')
    if (pattern.test(normalized)) {
      return value
    }
  }

  return null
}

function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function analyzeResults(data: ParsedCustomerData): {
  confidence: number
  missingFields: string[]
} {
  let score = 0
  const missing: string[] = []

  if (data.name) score += 25
  else missing.push('Name')

  if (data.phone) score += 30
  else missing.push('Phone')

  if (data.addressLine1) score += 20
  else missing.push('Address')

  if (data.pincode) score += 15
  else missing.push('Pincode')

  if (data.city) score += 5
  if (data.state) score += 5

  return {
    confidence: Math.min(100, Math.max(0, score)),
    missingFields: missing,
  }
}