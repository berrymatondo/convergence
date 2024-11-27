/*
  Warnings:

  - You are about to drop the column `countryRegisteredForSale` on the `staticInfoFund` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "staticInfoEquity_countryId_key";

-- DropIndex
DROP INDEX "staticInfoFx_countryId_key";

-- DropIndex
DROP INDEX "staticInfoIndex_countryId_key";

-- AlterTable
ALTER TABLE "staticInfoFund" DROP COLUMN "countryRegisteredForSale",
ADD COLUMN     "countryId" INTEGER;

-- AddForeignKey
ALTER TABLE "staticInfoFund" ADD CONSTRAINT "staticInfoFund_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
