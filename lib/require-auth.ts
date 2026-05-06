import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";

/** Ensures a valid Supabase session on the server; sends anonymous users to `/login`. */
export async function requireAuth() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { supabase, user };
}
