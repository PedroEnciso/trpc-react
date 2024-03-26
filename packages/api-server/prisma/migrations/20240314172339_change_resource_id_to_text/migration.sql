/*
  Warnings:

  - The primary key for the `Resources` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Resources" DROP CONSTRAINT "Resources_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Resources_pkey" PRIMARY KEY ("id");
