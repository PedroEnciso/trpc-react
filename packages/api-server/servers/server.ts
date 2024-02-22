import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";

// created for each request
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  hello: t.procedure.query(() => {
    return "hello from trpc";
  }),
  helloName: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation((opts) => {
      return `Hi ${opts.input.name}`;
    }),
});

export type AppRouter = typeof appRouter;
