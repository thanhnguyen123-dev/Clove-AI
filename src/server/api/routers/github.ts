import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { createClient } from "@/utils/supabase/server";
import { TRPCError } from "@trpc/server";
import { Octokit } from "octokit";


async function getOctokit() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.provider_token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No Github access token found",
    });
  }
  return new Octokit({
    auth: session.provider_token,
  });
}
export const githubRouter = createTRPCRouter({
  getRepo: protectedProcedure
    .input(z.object({
      owner: z.string(),
      repo: z.string(),
    }))
    .query(async ({ input }) => {
      try {
        const octokit = await getOctokit();
        const { owner, repo } = input;

        const response = await octokit.request("GET /repos/{owner}/{repo}", {
          owner,
          repo,  
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });

        return response.data;
      } catch (error) {
        console.error(`Error fetching repo ${input.owner}/${input.repo}:`, error);
        throw error;
      }
    }),

  getRepos: protectedProcedure
    .query(async () => {
      try {
        const octokit = await getOctokit();
        
        // First try the more comprehensive endpoint
        const response = await octokit.request("GET /user/repos", {
          visibility: "all",
          affiliation: "owner,collaborator,organization_member",
          sort: "updated",
          per_page: 100,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });

        return response.data;
      } catch (error) {
        console.error("Error fetching repos:", error);
        throw error;
      }
    }),

  getRepoContent: protectedProcedure
    .input(z.object({
      owner: z.string(),
      repo: z.string(),
      path: z.string().optional(),
    }))
    .query(async ({input}) => {
      try {
        const octokit = await getOctokit();
        const { owner, repo, path } = input;

        const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
          owner,
          repo,
          path: path ?? "",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });

        return response.data;
      } catch (error) {
        console.error(`Error fetching repo content ${input.owner}/${input.repo}/${input.path}:`, error);
        throw error;
      }
    }),

  getUser: protectedProcedure
    .query(async () => {
      const octokit = await getOctokit();
      const response = await octokit.request("GET /user", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      return response.data;
    }),
    
});