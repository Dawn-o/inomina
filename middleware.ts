import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

const PUBLIC_ROUTES = ["/", "/signin", "/signup"];
const PROTECTED_ROUTES = [
  "/dashboard",
  "/transactions",
  "/reports",
  "/settings",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { supabase, supabaseResponse } = await createClient(request);

  // Refresh session if expired - required for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If authenticated and on a public route, redirect to dashboard
  if (user && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If NOT authenticated and on a protected route, redirect to home
  if (!user && PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Otherwise, continue
  return supabaseResponse;
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/auth/callback",
    "/dashboard",
    "/transactions",
    "/reports",
    "/settings",
  ],
};
