import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      proposalId?: string;
      signature?: string;
    };
    if (!body.proposalId) {
      return NextResponse.json({ error: "proposalId required" }, { status: 400 });
    }
    // TODO: persist signature + set status to `signed` in Supabase
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Sign failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
