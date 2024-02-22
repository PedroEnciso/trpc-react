import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "api_server/servers/server";

export const trpc = createTRPCReact<AppRouter>();
