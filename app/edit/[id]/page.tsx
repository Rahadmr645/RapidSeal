"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProposalEditor } from "@/components/ProposalEditor";
import type { Proposal } from "@/lib/types";

function storageKey(id: string) {
  return `rapidseal:proposal:${id}`;
}

function emptyProposal(id: string): Proposal {
  return {
    id,
    user_id: "local",
    title: "Untitled proposal",
    brief: "",
    client_name: null,
    client_email: null,
    content: {
      overview: "",
      scope: "",
      timeline: "",
      investment: "",
      terms: "",
    },
    status: "draft",
    stripe_payment_link_id: null,
    signed_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export default function EditProposalPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [proposal, setProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    if (!id) return;
    const raw = typeof window !== "undefined" ? sessionStorage.getItem(storageKey(id)) : null;
    if (raw) {
      try {
        setProposal(JSON.parse(raw) as Proposal);
        return;
      } catch {
        /* fall through */
      }
    }
    setProposal(emptyProposal(id));
  }, [id]);

  if (!proposal) {
    return (
      <div className="text-sm text-neutral-600" aria-busy>
        Loading editor…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Link href="/dashboard" className="text-sm text-neutral-600 hover:text-neutral-900">
          ← Back to dashboard
        </Link>
      </div>
      <ProposalEditor proposal={proposal} />
    </div>
  );
}
