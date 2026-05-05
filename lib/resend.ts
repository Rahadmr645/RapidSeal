import { Resend } from "resend";

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY");
  return new Resend(key);
}

export async function sendProposalEmail(params: {
  to: string;
  subject: string;
  proposalUrl: string;
  businessName?: string | null;
}): Promise<{ id: string }> {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) throw new Error("Missing RESEND_FROM_EMAIL");

  const { data, error } = await resend.emails.send({
    from,
    to: params.to,
    subject: params.subject,
    html: `
      <p>Hi,</p>
      <p>${params.businessName ?? "We"} prepared a proposal for you.</p>
      <p><a href="${params.proposalUrl}">View and sign the proposal</a></p>
    `,
  });

  if (error) throw new Error(error.message);
  if (!data?.id) throw new Error("Resend did not return an id");
  return { id: data.id };
}
