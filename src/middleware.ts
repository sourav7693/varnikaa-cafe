import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/reboots"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("session")?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/reboots", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/reboots", req.url));
  }
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/admin-customer-order-management/:path*",
    "/admin-menu-products-management/:path*",
    "/admin-coupon-management/:path*",
  ],
};
