import Link from "next/link";
import { Syne } from "next/font/google";
import { AuthNav } from "@/components/AuthNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { APP_PATHS } from "@/lib/routes";

const brandFont = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export function Navbar() {
  return (
    <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className={`${brandFont.className} group inline-flex items-center rounded-md outline-none ring-offset-2 ring-offset-white focus-visible:ring-2 focus-visible:ring-neutral-400 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-500`}
        >
          <span className="relative text-[1.35rem] font-extrabold leading-none tracking-tight text-transparent bg-clip-text transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.04] bg-gradient-to-r from-neutral-900 via-indigo-600 to-violet-600 bg-[length:200%_100%] animate-brand-gradient dark:from-white dark:via-sky-400 dark:to-fuchsia-400">
            RapidSeal
          </span>
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link
            href="/dashboard"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            Dashboard
          </Link>
          <ThemeToggle />
          <Link
            href={APP_PATHS.createProposal}
            className="rounded-md bg-neutral-900 px-3 py-1.5 font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
          >
            New
          </Link>
          <AuthNav />
        </nav>
      </div>
    </header>
  );
}
