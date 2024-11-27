/*
  Warnings:

  - You are about to drop the column `country` on the `staticInfoEquity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[countryId]` on the table `staticInfoEquity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "staticInfoEquity" DROP COLUMN "country",
ADD COLUMN     "countryId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "staticInfoEquity_countryId_key" ON "staticInfoEquity"("countryId");

-- AddForeignKey
ALTER TABLE "staticInfoEquity" ADD CONSTRAINT "staticInfoEquity_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
