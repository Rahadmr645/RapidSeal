"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";

export function BackToDashboardLink() {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
  }, []);

  return (
    <Link
      ref={ref}
      href="/dashboard"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative inline-flex rounded-full bg-gradient-to-r from-indigo-500 via-violet-600 to-sky-500 p-[1.5px] shadow-[0_8px_28px_-6px_rgba(99,102,241,0.45)] outline-none ring-offset-2 ring-offset-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_14px_40px_-8px_rgba(99,102,241,0.55)] focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-[0.98] dark:from-sky-500 dark:via-indigo-500 dark:to-violet-600 dark:shadow-[0_10px_36px_-8px_rgba(56,189,248,0.35)] dark:ring-offset-neutral-950 dark:hover:shadow-[0_16px_48px_-10px_rgba(56,189,248,0.45)]"
    >
      <span className="relative flex items-center gap-3 overflow-hidden rounded-full bg-white/95 px-2 py-1.5 pl-2 pr-6 backdrop-blur-md dark:bg-neutral-950/95">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.12), transparent 60%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px bg-gradient-to-r from-indigo-500/0 via-violet-500/0 to-sky-500/0 opacity-0 blur-sm transition-all duration-500 group-hover:from-indigo-500/15 group-hover:via-violet-500/10 group-hover:to-sky-500/15 group-hover:opacity-100 dark:group-hover:from-sky-500/20 dark:group-hover:via-indigo-500/10 dark:group-hover:to-fuchsia-500/15"
        />
        <span className="relative z-10 flex items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-600 to-indigo-800 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_18px_rgba(79,70,229,0.5)] transition-transform duration-300 ease-out group-hover:-translate-x-0.5 group-hover:rotate-[-4deg] group-hover:scale-110 dark:from-sky-400 dark:via-indigo-500 dark:to-violet-800 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_22px_rgba(14,165,233,0.4)]">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-40"
            />
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative h-[18px] w-[18px] drop-shadow-sm"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13.25 10H6.75M6.75 10l3.9-3.9M6.75 10l3.9 3.9" />
            </svg>
          </span>
          <span className="text-sm font-semibold tracking-tight text-neutral-800 transition-colors duration-300 group-hover:text-indigo-700 dark:text-neutral-100 dark:group-hover:text-sky-300">
            Back to dashboard
          </span>
        </span>
      </span>
    </Link>
  );
}
