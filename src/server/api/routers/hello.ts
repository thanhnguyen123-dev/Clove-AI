import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const helloRouter = createTRPCRouter({
  getString: publicProcedure.query(() => {
    return "Hello, world!";
  }),
});
