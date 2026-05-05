import Link from "next/link";
import type { Proposal } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

export function ProposalCard({ proposal }: { proposal: Proposal }) {
  return (
    <Link
      href={`/edit/${proposal.id}`}
      className="block rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:border-neutral-300 hover:shadow"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="font-medium">{proposal.title}</h2>
          <p className="mt-0.5 text-sm text-neutral-600">
            {proposal.client_name ?? "No client"} · {proposal.client_email ?? "—"}
          </p>
        </div>
        <StatusBadge status={proposal.status} />
      </div>
    </Link>
  );
}
