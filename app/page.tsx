import Link from "next/link";
import { TypewriterParagraph } from "@/components/TypewriterParagraph";

const HOME_TAGLINE =
  "Turn a client brief into a polished proposal, send it for review, collect a signature, and get paid—with Claude, Supabase, Stripe, and Resend wired in.";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          RapidSeal
        </h1>
        <TypewriterParagraph
          text={HOME_TAGLINE}
          speed={22}
          className="max-w-xl text-neutral-600 dark:text-neutral-400"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/login"
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
        >
          Sign in
        </Link>
        <Link
          href="/dashboard"
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-900"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
