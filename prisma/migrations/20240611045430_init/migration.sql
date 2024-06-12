/*
  Warnings:

  - You are about to drop the column `companyId` on the `gos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "gos" DROP CONSTRAINT "gos_companyId_fkey";

-- AlterTable
ALTER TABLE "gos" DROP COLUMN "companyId",
ADD COLUMN     "countryId" INTEGER;

-- AddForeignKey
ALTER TABLE "gos" ADD CONSTRAINT "gos_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
