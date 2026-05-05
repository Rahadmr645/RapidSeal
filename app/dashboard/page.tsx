import Link from "next/link";
import { ProposalCard } from "@/components/ProposalCard";
import type { Proposal } from "@/lib/types";

const demoProposals: Proposal[] = [
  {
    id: "demo-1",
    user_id: "demo",
    title: "Website redesign",
    brief: "Refresh brand and improve conversions.",
    client_name: "Acme Co",
    client_email: "hello@acme.test",
    content: {},
    status: "draft",
    stripe_payment_link_id: null,
    signed_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function DashboardPage() {
  const sent = demoProposals.filter((p) => p.status !== "draft").length;
  const paid = demoProposals.filter((p) => p.status === "paid").length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-neutral-600">Proposals and quick stats.</p>
        </div>
        <Link
          href="/new"
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          New proposal
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total" value={String(demoProposals.length)} />
        <Stat label="Sent or beyond" value={String(sent)} />
        <Stat label="Paid" value={String(paid)} />
      </div>
      <ul className="space-y-3">
        {demoProposals.map((p) => (
          <li key={p.id}>
            <ProposalCard proposal={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
