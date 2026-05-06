"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/** Matches the `dark` class next-themes sets on <html>. */
function useDocumentDark(): boolean | null {
  const [mounted, setMounted] = useState(false);
  const [, rerender] = useState(0);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const sync = () => rerender((n) => n + 1);
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;
  return document.documentElement.classList.contains("dark");
}

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const isDark = useDocumentDark();

  if (isDark === null) {
    return (
      <span className="inline-flex h-8 w-8 rounded-md border border-neutral-600 bg-neutral-100 dark:bg-neutral-900" aria-hidden />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      className={
        isDark
          ? "inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-500 bg-neutral-950 text-neutral-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] transition-opacity hover:opacity-90"
          : "inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-900 shadow-sm transition-opacity hover:opacity-90 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100"
      }
    >
      {isDark ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
    </button>
  );
}
