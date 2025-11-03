import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  const { pathname } = request.nextUrl

  // Public routes
  if (pathname === "/login") {
    if (token) {
      const session = await verifyToken(token)
      if (session) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }
    return NextResponse.next()
  }

  // Protected routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/users")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const session = await verifyToken(token)
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Admin only routes
    if (pathname.startsWith("/users") && session.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/users/:path*", "/login"],
}
