import { NextResponse } from "next/server";
import { generateProposal } from "@/lib/claude";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      brief?: string;
      clientName?: string;
      clientEmail?: string;
    };
    if (!body.brief?.trim()) {
      return NextResponse.json({ error: "Brief is required" }, { status: 400 });
    }

    const generated = await generateProposal(body.brief);
    const id = crypto.randomUUID();

    return NextResponse.json({
      id,
      title: generated.title,
      brief: generated.brief,
      content: generated.content,
      client_name: body.clientName ?? null,
      client_email: body.clientEmail ?? null,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
