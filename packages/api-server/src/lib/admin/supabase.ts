import prisma from "root/prisma/client";
import type { Resources } from "@prisma/client";

export const SupabaseAdminAPI = {
  async createResources(resources: Resources[]) {
    await prisma.resources.createMany({
      data: resources,
    });
  },
};
