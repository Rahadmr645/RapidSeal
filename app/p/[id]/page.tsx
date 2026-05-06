import type { Proposal } from "@/lib/types";

type Props = { params: { id: string } };

export default function PublicProposalPage({ params }: Props) {
  const { id } = params;

  const proposal: Proposal = {
    id,
    user_id: "public",
    title: "Proposal",
    brief: "",
    client_name: "Client",
    client_email: null,
    content: {
      overview: "This is the **public client view** (`/p/[id]`). Wire Supabase to fetch by id.",
      scope: "",
      timeline: "",
      investment: "",
      terms: "",
    },
    status: "sent",
    stripe_payment_link_id: null,
    signed_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10">
      <header className="space-y-2 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Proposal
        </p>
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-50">{proposal.title}</h1>
      </header>
      <article className="max-w-none">
        {Object.entries(proposal.content as Record<string, string>).map(([key, val]) => (
          <section key={key} className="mb-8">
            <h2 className="text-lg font-semibold capitalize text-neutral-900 dark:text-neutral-50">{key}</h2>
            <p className="whitespace-pre-wrap text-neutral-700 dark:text-neutral-300">{val}</p>
          </section>
        ))}
      </article>
      <footer className="rounded-xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-400">
        Signing and payment UI hook to{" "}
        <code className="rounded bg-neutral-100 px-1 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
          /api/sign-proposal
        </code>{" "}
        and Stripe Checkout.
      </footer>
    </div>
  );
}
