import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter, createContext } from "./servers/server";
import cors from "cors";

const app = express();
app.use(cors());
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

app.post("/uploadResources", (req, res) => {
  console.log("posted to /uploadResources");
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
