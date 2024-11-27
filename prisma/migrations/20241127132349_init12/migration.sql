/*
  Warnings:

  - You are about to drop the column `country` on the `staticInfoIndex` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[countryId]` on the table `staticInfoIndex` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "staticInfoIndex" DROP COLUMN "country",
ADD COLUMN     "countryId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "staticInfoIndex_countryId_key" ON "staticInfoIndex"("countryId");

-- AddForeignKey
ALTER TABLE "staticInfoIndex" ADD CONSTRAINT "staticInfoIndex_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
