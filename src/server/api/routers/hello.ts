import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const helloRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "Hello, world!";
  }),
});
