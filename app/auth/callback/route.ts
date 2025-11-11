import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const host = request.headers.get("host");
      const forwardedHost = request.headers.get("x-forwarded-host");
      const forwardedProto =
        request.headers.get("x-forwarded-proto") || "https";

      const redirectHost = forwardedHost || host || "inomina.vercel.app";
      const redirectUrl = `${forwardedProto}://${redirectHost}${next}`;

      return NextResponse.redirect(redirectUrl);
    }
  }

  const host = request.headers.get("host");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const redirectHost = forwardedHost || host || "inomina.vercel.app";
  const errorUrl = `${forwardedProto}://${redirectHost}/auth/auth-code-error`;

  return NextResponse.redirect(errorUrl);
}
