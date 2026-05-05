import Stripe from "stripe";

let stripeSingleton: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeSingleton) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
    stripeSingleton = new Stripe(key);
  }
  return stripeSingleton;
}

export async function createPaymentLink(params: {
  proposalId: string;
  amountCents: number;
  productName: string;
}): Promise<{ url: string; id: string }> {
  const stripe = getStripe();
  const price = await stripe.prices.create({
    currency: "usd",
    unit_amount: params.amountCents,
    product_data: { name: params.productName },
  });

  const link = await stripe.paymentLinks.create({
    line_items: [{ price: price.id, quantity: 1 }],
    metadata: { proposal_id: params.proposalId },
  });

  return { url: link.url, id: link.id };
}
