// server packages
import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import uuid from "uuid";
import crypto from "crypto";
// trpc imports
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter, createContext } from "src/servers/server";
// server config
dotenv.config();
const upload = multer({ dest: "src/__temp__/" });
const app = express();
app.use(cors());
const port = 8000;
// function imports
import { CloudinaryAdminAPI } from "./lib/admin/cloudinary";
import { validateUploadedDisplayNames } from "src/lib/admin/util";
import { SupabaseAdminAPI } from "./lib/admin/supabase";
// type imports
import type { Resources } from "@prisma/client";
/***** END IMPORTS *****/

// server routes
app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

app.post("/api/uploadResources", upload.array("files"), async (req, res) => {
  // TODO: validate data
  const uploadedFiles = req.files as Express.Multer.File[];
  const uploadedDisplayNames = validateUploadedDisplayNames(
    req.body.displayNames as string | string[]
  );

  // create id list to return to the client
  // const idList = uploadedFiles.map((_file) => uuid.v4());
  const idList: string[] = [];
  for (let i = 0; i < uploadedFiles.length; i++) {
    idList.push(crypto.randomUUID());
  }

  res.json(idList);
  console.log("sent response to client", idList);

  // save the pdf file to cloudinary
  // receive array of urls: {previewUrl, pdfUrl}
  const urlList = await CloudinaryAdminAPI.savePdfs(uploadedFiles);

  // save a reference of the pdf file in resources table
  const resources: Resources[] = [];
  for (const [index, file] of uploadedFiles.entries()) {
    resources.push({
      id: idList[index],
      displayName: uploadedDisplayNames[index],
      pdfUrl: urlList[index].pdfUrl,
      previewUrl: urlList[index].previewUrl,
    });
  }
  SupabaseAdminAPI.createResources(resources);
});

// trpc routers
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// start server
app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
