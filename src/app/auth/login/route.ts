import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { type Provider } from "@supabase/supabase-js";

function getOriginFromRequest(request: Request) {
  const proto = request.headers.get("x-forwarded-proto") ?? new URL(request.url).protocol;
  const host = request.headers.get("x-forwarded-host") ?? new URL(request.url).host;
  return `${proto}//${host}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const provider =  (searchParams.get("provider") ?? "google") as Provider;
  const supabase = await createClient();

  const origin = getOriginFromRequest(request);
  const redirectUrl = `${origin}/auth/callback`;

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
