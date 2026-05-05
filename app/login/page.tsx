"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${origin}/dashboard` },
      });
      if (oauthError) setError(oauthError.message);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start Google sign-in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div>
        <h1 className="text-xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-neutral-600">Continue with your Google account.</p>
      </div>
      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium hover:bg-neutral-50 disabled:opacity-60"
      >
        {loading ? "Redirecting…" : "Continue with Google"}
      </button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
