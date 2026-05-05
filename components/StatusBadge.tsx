import type { ProposalStatus } from "@/lib/types";

const styles: Record<ProposalStatus, string> = {
  draft: "bg-neutral-100 text-neutral-700",
  sent: "bg-blue-50 text-blue-800",
  viewed: "bg-amber-50 text-amber-900",
  signed: "bg-emerald-50 text-emerald-900",
  paid: "bg-violet-50 text-violet-900",
};

export function StatusBadge({ status }: { status: ProposalStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
