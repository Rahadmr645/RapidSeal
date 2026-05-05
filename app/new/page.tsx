import { BriefForm } from "@/components/BriefForm";

export default function NewProposalPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">New proposal</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Paste the brief and client details. We will generate a structured proposal with Claude.
        </p>
      </div>
      <BriefForm />
    </div>
  );
}
