import Link from "next/link";
import { ProposalCard } from "@/components/ProposalCard";
import { requireAuth } from "@/lib/require-auth";
import { APP_PATHS } from "@/lib/routes";
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

export default async function DashboardPage() {
  const { user } = await requireAuth();
  const sent = demoProposals.filter((p) => p.status !== "draft").length;
  const paid = demoProposals.filter((p) => p.status === "paid").length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">Dashboard</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Proposals and quick stats.
            {user.email ? (
              <span className="mt-1 block text-xs text-neutral-500 dark:text-neutral-500">
                Signed in as {user.email}
              </span>
            ) : null}
          </p>
        </div>
        <Link
          href={APP_PATHS.createProposal}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
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
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-950 dark:shadow-none">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-neutral-900 tabular-nums dark:text-neutral-50">{value}</p>
    </div>
  );
}
