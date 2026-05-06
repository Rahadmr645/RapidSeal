import { EditProposalClient } from "./edit-proposal-client";
import { requireAuth } from "@/lib/require-auth";

export default async function EditProposalPage({ params }: { params: { id: string } }) {
  await requireAuth();
  return <EditProposalClient id={params.id} />;
}
