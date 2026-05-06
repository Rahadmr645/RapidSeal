import { NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

function safeRelativePath(candidate: string | null, fallback: string) {
  if (!candidate?.startsWith("/") || candidate.startsWith("//")) {
    return fallback;
  }
  return candidate;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextPath = safeRelativePath(url.searchParams.get("next"), "/dashboard");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(
      new URL("/login?error=Missing_Supabase_configuration", url.origin),
    );
  }

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=Sign-in_was_cancelled", url.origin));
  }

  const cookieStore = await cookies();
  const redirectUrl = new URL(nextPath, url.origin);
  const response = NextResponse.redirect(redirectUrl);

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options as CookieOptions),
        );
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const msg = encodeURIComponent(error.message.replace(/\s+/g, "_"));
    return NextResponse.redirect(new URL(`/login?error=${msg}`, url.origin));
  }

  return response;
}
