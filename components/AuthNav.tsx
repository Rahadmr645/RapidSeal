"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";
import { userInitials } from "@/lib/user-display";

export function AuthNav() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (user === undefined) {
    return (
      <span
        className="inline-flex h-8 min-w-[4.5rem] items-center justify-center rounded-full bg-neutral-200 text-[0.65rem] font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
        aria-hidden
      >
        …
      </span>
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-900"
      >
        Sign in
      </Link>
    );
  }

  return (
    <Link
      href="/profile"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-800 outline-none ring-offset-2 transition-[background-color,transform] hover:bg-neutral-300 focus-visible:ring-2 focus-visible:ring-indigo-500/80 active:scale-[0.97] dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600 dark:ring-offset-neutral-950"
      title="Profile"
      aria-label="Open profile"
    >
      {userInitials(user)}
    </Link>
  );
}
