import { BriefForm } from "@/components/BriefForm";
import { requireAuth } from "@/lib/require-auth";

export default async function ComposeProposalPage() {
  await requireAuth();
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">New proposal</h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Paste the brief and client details. We will generate a structured proposal with Claude.
        </p>
      </div>
      <BriefForm />
    </div>
  );
}
