import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await req.json();
    // TODO: upsert row in Supabase `proposals` for authenticated user
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
