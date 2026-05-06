"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { TypewriterParagraph } from "@/components/TypewriterParagraph";
import { createClient } from "@/lib/supabase";

const LOGIN_PROMPT =
  "Continue with your Google account to save proposals, send for signature, and get paid—all in one place.";

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function LoginPageClient() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("error");
    if (!q) return;
    setError(q.replace(/_/g, " "));
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  async function signInWithGoogle() {
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent("/dashboard")}`;
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (oauthError) setError(oauthError.message);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start Google sign-in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative isolate flex min-h-[min(560px,calc(100vh-11rem))] flex-col justify-center pb-14 pt-6">
      <div
        className={`pointer-events-none absolute -left-[12%] top-[8%] h-72 w-72 rounded-full blur-[100px] ${
          isDark ? "bg-indigo-500/25" : "bg-indigo-500/35"
        }`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute -right-[8%] bottom-[14%] h-72 w-72 rounded-full blur-[100px] ${
          isDark ? "bg-fuchsia-500/22" : "bg-fuchsia-500/35"
        }`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-px w-[min(100%,42rem)] -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent ${
          isDark ? "via-white/25" : "via-neutral-900/25"
        }`}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[416px]">
        <div
          className={
            [
              "pointer-events-none absolute -inset-px rounded-[1.375rem] bg-gradient-to-br blur-[1px]",
              isDark
                ? "from-indigo-400/45 via-violet-500/30 to-fuchsia-500/40 opacity-90"
                : "from-indigo-500/85 via-violet-500/50 to-fuchsia-500/75 opacity-95",
            ].join(" ")
          }
          aria-hidden
        />
        <div
          className={
            [
              "pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br via-transparent blur-2xl",
              isDark
                ? "from-indigo-500/18 to-fuchsia-500/12"
                : "from-indigo-500/15 to-fuchsia-500/20",
            ].join(" ")
          }
          aria-hidden
        />

        <article
          className={[
            "relative overflow-hidden rounded-2xl border backdrop-blur-md",
            isDark
              ? "border-neutral-600 bg-neutral-950 text-neutral-50 shadow-[0_32px_90px_-30px_rgba(0,0,0,0.85)]"
              : "border-neutral-200 bg-white text-slate-900 shadow-[0_28px_80px_-26px_rgba(15,23,42,0.35)]",
          ].join(" ")}
        >
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 z-0 h-24 bg-gradient-to-b to-transparent ${
              isDark ? "from-white/[0.07]" : "from-neutral-950/[0.04]"
            }`}
            aria-hidden
          />
          <div
            className={`pointer-events-none absolute inset-x-6 top-0 z-0 h-px bg-gradient-to-r from-transparent to-transparent ${
              isDark ? "via-white/15" : "via-neutral-950/14"
            }`}
          />

          <div className="relative z-10 space-y-7 px-7 pb-10 pt-9 sm:px-9">
            <header className="space-y-3">
              <h1
                className={`text-balance text-[1.7rem] font-bold leading-snug tracking-[0.015em] [font-kerning:normal] [font-variant-ligatures:none] [text-rendering:optimizeLegibility] ${isDark ? "text-white" : "text-slate-950"}`}
              >
                Sign in
              </h1>
              <TypewriterParagraph
                text={LOGIN_PROMPT}
                speed={26}
                repeat={false}
                className={`min-h-[4.75rem] text-[0.935rem] leading-relaxed ${isDark ? "text-neutral-200" : "text-slate-700"}`}
              />
            </header>

            <div className="space-y-4">
              <button
                type="button"
                onClick={signInWithGoogle}
                disabled={loading}
                className={`group relative flex min-h-[3.25rem] w-full items-center justify-center gap-3 rounded-xl border px-4 py-[0.6875rem] text-[0.945rem] font-semibold tracking-tight shadow-[0_10px_32px_-20px_rgba(15,23,42,0.45)] outline-none ring-offset-2 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-24px_rgba(15,23,42,0.36)] focus-visible:ring-2 focus-visible:ring-indigo-500/80 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 ${
                  isDark
                    ? "border-neutral-500 bg-neutral-900 text-white ring-offset-neutral-950 hover:border-neutral-400 hover:bg-neutral-800 focus-visible:ring-indigo-400"
                    : "border-neutral-300 bg-white text-neutral-950 ring-offset-white hover:border-neutral-400 hover:bg-neutral-50"
                }`}
              >
                {loading ? (
                  <span
                    className={`flex items-center gap-2 ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                  >
                    <span
                      className={`h-5 w-5 animate-spin rounded-full border-2 border-t-transparent ${
                        isDark ? "border-neutral-400" : "border-neutral-400"
                      }`}
                    />
                    Redirecting…
                  </span>
                ) : (
                  <>
                    <GoogleMark className="h-5 w-5 shrink-0" />
                    Continue with Google
                  </>
                )}
              </button>

              <p
                className={`text-center text-xs leading-snug ${isDark ? "text-neutral-400" : "text-slate-600"}`}
              >
                You’ll finish sign-in at Google — we never see your password.
              </p>
            </div>

            {error ? (
              <div
                role="alert"
                className={`rounded-xl border px-3.5 py-2.5 text-sm leading-snug ${
                  isDark
                    ? "border-red-800/70 bg-red-950/65 text-red-100"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {error}
              </div>
            ) : null}

            <p
              className={`border-t pt-7 text-center text-sm ${isDark ? "border-neutral-700 text-neutral-200" : "border-neutral-200 text-slate-800"}`}
            >
              <Link
                href="/"
                className={`font-semibold underline-offset-4 transition-colors hover:underline ${
                  isDark
                    ? "text-neutral-200 hover:text-white"
                    : "text-slate-800 hover:text-slate-950"
                }`}
              >
                ← Back to home
              </Link>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
