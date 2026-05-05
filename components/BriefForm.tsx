"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "./LoadingSpinner";

export function BriefForm() {
  const router = useRouter();
  const [brief, setBrief] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief, clientName, clientEmail }),
      });
      const data = (await res.json()) as {
        id?: string;
        error?: string;
        title?: string;
        brief?: string;
        content?: unknown;
        client_name?: string | null;
        client_email?: string | null;
      };
      if (!res.ok) throw new Error(data.error ?? "Generation failed");
      if (data.id) {
        const draft: Record<string, unknown> = {
          id: data.id,
          user_id: "local",
          title: data.title ?? "Proposal",
          brief: data.brief ?? brief,
          client_name: (data.client_name ?? clientName) || null,
          client_email: (data.client_email ?? clientEmail) || null,
          content: data.content ?? {},
          status: "draft",
          stripe_payment_link_id: null,
          signed_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        sessionStorage.setItem(`rapidseal:proposal:${data.id}`, JSON.stringify(draft));
        router.push(`/edit/${data.id}`);
      } else router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner label="Generating proposal…" />;

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
      <label className="block space-y-1">
        <span className="text-sm font-medium">Project brief</span>
        <textarea
          required
          rows={8}
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          placeholder="Goals, deliverables, constraints, links…"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-sm font-medium">Client name</span>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">Client email</span>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </label>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        className="w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
      >
        Generate proposal
      </button>
    </form>
  );
}
