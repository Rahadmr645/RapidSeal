export type ProposalStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "signed"
  | "paid";

export interface Proposal {
  id: string;
  user_id: string;
  title: string;
  brief: string;
  client_name: string | null;
  client_email: string | null;
  content: Record<string, unknown>;
  status: ProposalStatus;
  stripe_payment_link_id: string | null;
  signed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  business_name: string | null;
  business_type: string | null;
  onboarding_complete: boolean;
}
