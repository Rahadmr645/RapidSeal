import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">RapidSeal</h1>
        <p className="max-w-xl text-neutral-600">
          Turn a client brief into a polished proposal, send it for review, collect a
          signature, and get paid—with Claude, Supabase, Stripe, and Resend wired in.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/login"
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Sign in
        </Link>
        <Link
          href="/dashboard"
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
