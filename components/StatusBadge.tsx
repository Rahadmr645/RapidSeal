import type { ProposalStatus } from "@/lib/types";

const styles: Record<ProposalStatus, string> = {
  draft:
    "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
  sent: "bg-blue-50 text-blue-800 dark:bg-blue-950/80 dark:text-blue-200",
  viewed: "bg-amber-50 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200",
  signed: "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200",
  paid: "bg-violet-50 text-violet-900 dark:bg-violet-950/80 dark:text-violet-200",
};

export function StatusBadge({ status }: { status: ProposalStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
