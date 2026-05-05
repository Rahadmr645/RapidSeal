"use client";

import { useCallback, useEffect, useState } from "react";
import type { Proposal } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

type SectionKey = "overview" | "scope" | "timeline" | "investment" | "terms";

const SECTIONS: SectionKey[] = ["overview", "scope", "timeline", "investment", "terms"];

export function ProposalEditor({ proposal: initial }: { proposal: Proposal }) {
  const [proposal, setProposal] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem(`rapidseal:proposal:${proposal.id}`, JSON.stringify(proposal));
      } catch {
        /* ignore */
      }
    }, 400);
    return () => window.clearTimeout(t);
  }, [proposal]);

  const content = (proposal.content ?? {}) as Record<string, string>;

  const save = useCallback(async () => {
    setSaving(true);
    try {
      await fetch("/api/save-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: proposal.id,
          title: proposal.title,
          brief: proposal.brief,
          content: proposal.content,
          client_name: proposal.client_name,
          client_email: proposal.client_email,
        }),
      });
      setLastSaved(new Date().toLocaleTimeString());
    } finally {
      setSaving(false);
    }
  }, [proposal]);

  function updateSection(key: SectionKey, value: string) {
    setProposal((p) => ({
      ...p,
      content: { ...(p.content as object), [key]: value },
    }));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-4">
        <div className="space-y-2">
          <input
            value={proposal.title}
            onChange={(e) => setProposal((p) => ({ ...p, title: e.target.value }))}
            className="w-full max-w-xl border-b border-transparent text-2xl font-semibold outline-none focus:border-neutral-300"
          />
          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
            <StatusBadge status={proposal.status} />
            {saving ? <span>Saving…</span> : lastSaved ? <span>Saved {lastSaved}</span> : null}
          </div>
        </div>
        <button
          type="button"
          onClick={() => void save()}
          className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-50"
        >
          Save now
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
        <div className="space-y-8">
          {SECTIONS.map((key) => (
            <section key={key} className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">{key}</h2>
              <textarea
                rows={key === "terms" ? 10 : 6}
                value={content[key] ?? ""}
                onChange={(e) => updateSection(key, e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-sm leading-relaxed shadow-inner"
              />
            </section>
          ))}
        </div>
        <aside className="space-y-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
          <h3 className="font-medium">Client</h3>
          <label className="block space-y-1">
            <span className="text-xs text-neutral-500">Name</span>
            <input
              value={proposal.client_name ?? ""}
              onChange={(e) => setProposal((p) => ({ ...p, client_name: e.target.value || null }))}
              className="w-full rounded-md border border-neutral-300 px-2 py-1.5"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs text-neutral-500">Email</span>
            <input
              type="email"
              value={proposal.client_email ?? ""}
              onChange={(e) => setProposal((p) => ({ ...p, client_email: e.target.value || null }))}
              className="w-full rounded-md border border-neutral-300 px-2 py-1.5"
            />
          </label>
          <button
            type="button"
            className="mt-2 w-full rounded-lg bg-neutral-900 py-2 text-xs font-medium text-white hover:bg-neutral-800"
            onClick={() =>
              fetch("/api/send-proposal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  proposalId: proposal.id,
                  clientEmail: proposal.client_email ?? undefined,
                  title: proposal.title,
                }),
              })
            }
          >
            Send to client
          </button>
        </aside>
      </div>
    </div>
  );
}
