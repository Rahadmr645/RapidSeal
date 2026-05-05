import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="relative block h-8 w-8 overflow-hidden rounded-md ring-1 ring-neutral-900/10">
            <Image src="/logo.png" alt="" fill className="object-cover" sizes="32px" priority />
          </span>
          <span>RapidSeal</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/dashboard" className="text-neutral-600 hover:text-neutral-900">
            Dashboard
          </Link>
          <Link
            href="/new"
            className="rounded-md bg-neutral-900 px-3 py-1.5 font-medium text-white hover:bg-neutral-800"
          >
            New
          </Link>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-700"
            title="User"
          >
            U
          </span>
        </nav>
      </div>
    </header>
  );
}
