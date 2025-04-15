// import { createClient } from "@/utils/supabase/server";
// import { TRPCError } from "@trpc/server";
// import { Octokit } from "octokit";

// export async function getOctokit() {
//   const supabase = await createClient();  
//   const { data: { session } } = await supabase.auth.getSession();

//   let token: string | undefined;

//   if (session?.provider_token) {
//     if (session.expires_at && session.expires_at * 1000 < Date.now()) {
//       const { data: refreshResult, error: refreshError } = await supabase.auth.refreshSession();
//       if (refreshError || !refreshResult.session?.provider_token) {
//         throw new TRPCError({
//           code: "UNAUTHORIZED",
//           message: "Failed to refresh session",
//         });
//       }
//       token = refreshResult.session.provider_token;
//     } else {
//       token = session.provider_token;
//     }
//   }
//   else {
//     const { data: refreshResult, error: refreshError } = await supabase.auth.getSession();
//     if (refreshError || !refreshResult.session?.provider_token) {
//       throw new TRPCError({
//         code: "UNAUTHORIZED",
//         message: "Failed to refresh session",
//       });
//     }
//     token = refreshResult.session.provider_token;
//   }

//   return new Octokit({
//     auth: token,
//   });
// }