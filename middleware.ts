import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/home", "/signin", "/signup"];
const PROTECTED_ROUTES = ["/dashboard", "/transactions", "/reports", "/settings"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("firebase_token")?.value;

    // If authenticated and on a public route, redirect to dashboard
    if (token && PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If NOT authenticated and on a protected route, redirect to home
    if (!token && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Otherwise, continue
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/", "/home", "/signin", "/signup",
        "/dashboard", "/transactions", "/reports", "/settings"
    ],
};
