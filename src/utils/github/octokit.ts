import { createClient } from "@/utils/supabase/server";
import { TRPCError } from "@trpc/server";
import { Octokit } from "octokit";

export async function getOctokit() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.provider_token) {
    const { data: refreshResult, error: refreshError } = await supabase.auth.refreshSession();
    if (refreshError ?? !refreshResult.session?.provider_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to refresh session",
      });
    }

    return new Octokit({
      auth: refreshResult.session.provider_token,
    });
  }

  return new Octokit({
    auth: session.provider_token,
  });
}