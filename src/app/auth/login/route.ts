import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { type Provider } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const provider =  (searchParams.get("provider") ?? "google") as Provider;
  const supabase = await createClient();
  const redirectUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000/auth/callback" : new URL("/auth/callback", request.url).origin;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
      scopes: provider === "github" ? "repo,read:user,read:org,user:email" : "email profile",
    },
  })
  if (error) {
    return NextResponse.redirect("/some-error")
  }

  return NextResponse.redirect(data.url)
}
