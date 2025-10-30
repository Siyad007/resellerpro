import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Changed from 'middleware' to 'proxy'
export function proxy(request: NextRequest) {
  // For now, just pass through all requests
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}