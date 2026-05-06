"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

const CONFIRM_PHRASE = "DELETE";

export function DeleteAccountButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phraseOk = phrase.trim() === CONFIRM_PHRASE;

  async function deleteAccount() {
    if (!phraseOk) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/delete-account", { method: "POST" });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Try again later.");
        return;
      }

      const supabase = createClient();
      await supabase.auth.signOut();
      router.refresh();
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {!open ? (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setError(null);
            setPhrase("");
          }}
          className="rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 dark:border-red-900/80 dark:bg-neutral-950 dark:text-red-400 dark:hover:bg-red-950/40"
        >
          Delete my account
        </button>
      ) : (
        <div className="space-y-3 rounded-xl border border-red-200 bg-red-50/40 p-4 dark:border-red-900/60 dark:bg-red-950/20">
          <p className="text-sm text-neutral-800 dark:text-neutral-200">
            This permanently deletes your RapidSeal login. You will need to sign in again with Google to
            create a new account.
          </p>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
              Type {CONFIRM_PHRASE} to confirm
            </span>
            <input
              type="text"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              autoComplete="off"
              className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none ring-red-500/30 focus:border-red-400 focus:ring-2 dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-100"
              placeholder={CONFIRM_PHRASE}
              disabled={loading}
            />
          </label>
          {error ? (
            <p className="text-sm text-red-700 dark:text-red-400" role="alert">
              {error}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={loading || !phraseOk}
              onClick={() => void deleteAccount()}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50 dark:bg-red-700 dark:hover:bg-red-600"
            >
              {loading ? "Deleting…" : "Permanently delete account"}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setOpen(false);
                setPhrase("");
                setError(null);
              }}
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
