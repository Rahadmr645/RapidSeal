import { NextResponse } from "next/server";
import { createPaymentLink } from "@/lib/stripe";
import { sendProposalEmail } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      proposalId?: string;
      clientEmail?: string;
      amountCents?: number;
      title?: string;
    };
    if (!body.proposalId) {
      return NextResponse.json({ error: "proposalId required" }, { status: 400 });
    }

    const origin = (() => {
      if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
      if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
      return "http://localhost:3000";
    })();

    const { url, id: linkId } = await createPaymentLink({
      proposalId: body.proposalId,
      amountCents: body.amountCents ?? 50000,
      productName: body.title ?? "Proposal payment",
    });

    if (body.clientEmail) {
      await sendProposalEmail({
        to: body.clientEmail,
        subject: "Your proposal is ready",
        proposalUrl: `${origin}/p/${body.proposalId}`,
        businessName: null,
      });
    }

    return NextResponse.json({ paymentLinkUrl: url, stripePaymentLinkId: linkId });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Send failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
