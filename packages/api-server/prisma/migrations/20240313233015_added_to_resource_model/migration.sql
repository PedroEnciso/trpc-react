/*
  Warnings:

  - You are about to drop the column `path` on the `Resources` table. All the data in the column will be lost.
  - Added the required column `pdfUrl` to the `Resources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previewUrl` to the `Resources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resources" DROP COLUMN "path",
ADD COLUMN     "pdfUrl" TEXT NOT NULL,
ADD COLUMN     "previewUrl" TEXT NOT NULL;
