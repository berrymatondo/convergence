/*
  Warnings:

  - You are about to drop the column `flag` on the `staticInfoFx` table. All the data in the column will be lost.
  - Added the required column `sector` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Made the column `staticInfoBondId` on table `historicalDataBond` required. This step will fail if there are existing NULL values in that column.
  - Made the column `staticInfoCommoId` on table `historicalDataCommo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `staticInfoEquityId` on table `historicalDataEquity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `staticInfoFxId` on table `historicalDataFx` required. This step will fail if there are existing NULL values in that column.
  - Made the column `staticInfoIndexId` on table `historicalDataIndex` required. This step will fail if there are existing NULL values in that column.
  - Made the column `countryId` on table `staticInfoBond` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currencyId` on table `staticInfoCommo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `countryId` on table `staticInfoCountry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `staticInfoFund` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currencyId1` on table `staticInfoFx` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currencyId2` on table `staticInfoFx` required. This step will fail if there are existing NULL values in that column.
  - Made the column `countryId` on table `staticInfoFx` required. This step will fail if there are existing NULL values in that column.
  - Made the column `countryId2` on table `staticInfoFx` required. This step will fail if there are existing NULL values in that column.
  - Made the column `countryId` on table `staticInfoIndex` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currencyId` on table `staticInfoIndex` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "UserRoles" ADD VALUE 'TRAINING';

-- DropForeignKey
ALTER TABLE "historicalDataBond" DROP CONSTRAINT "historicalDataBond_staticInfoBondId_fkey";

-- DropForeignKey
ALTER TABLE "historicalDataCommo" DROP CONSTRAINT "historicalDataCommo_staticInfoCommoId_fkey";

-- DropForeignKey
ALTER TABLE "historicalDataEquity" DROP CONSTRAINT "historicalDataEquity_staticInfoEquityId_fkey";

-- DropForeignKey
ALTER TABLE "historicalDataFx" DROP CONSTRAINT "historicalDataFx_staticInfoFxId_fkey";

-- DropForeignKey
ALTER TABLE "historicalDataIndex" DROP CONSTRAINT "historicalDataIndex_staticInfoIndexId_fkey";

-- DropForeignKey
ALTER TABLE "staticInfoBond" DROP CONSTRAINT "staticInfoBond_countryId_fkey";

-- DropForeignKey
ALTER TABLE "staticInfoCommo" DROP CONSTRAINT "staticInfoCommo_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "staticInfoCountry" DROP CONSTRAINT "staticInfoCountry_countryId_fkey";

-- DropForeignKey
ALTER TABLE "staticInfoFx" DROP CONSTRAINT "staticInfoFx_countryId2_fkey";

-- DropForeignKey
ALTER TABLE "staticInfoFx" DROP CONSTRAINT "staticInfoFx_countryId_fkey";

-- DropForeignKey
ALTER TABLE "staticInfoFx" DROP CONSTRAINT "staticInfoFx_currencyId1_fkey";

-- DropForeignKey
ALTER TABLE "staticInfoFx" DROP CONSTRAINT "staticInfoFx_currencyId2_fkey";

-- DropForeignKey
ALTER TABLE "staticInfoIndex" DROP CONSTRAINT "staticInfoIndex_countryId_fkey";

-- DropForeignKey
ALTER TABLE "staticInfoIndex" DROP CONSTRAINT "staticInfoIndex_currencyId_fkey";

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "countryId" INTEGER,
ADD COLUMN     "sector" "SectorList" NOT NULL;

-- AlterTable
ALTER TABLE "historicalDataBond" ALTER COLUMN "staticInfoBondId" SET NOT NULL,
ALTER COLUMN "change" DROP NOT NULL,
ALTER COLUMN "changePercentage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "historicalDataCommo" ALTER COLUMN "staticInfoCommoId" SET NOT NULL,
ALTER COLUMN "change" DROP NOT NULL,
ALTER COLUMN "changePercentage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "historicalDataEquity" ALTER COLUMN "staticInfoEquityId" SET NOT NULL,
ALTER COLUMN "change" DROP NOT NULL,
ALTER COLUMN "changePercentage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "historicalDataFx" ALTER COLUMN "staticInfoFxId" SET NOT NULL,
ALTER COLUMN "change" DROP NOT NULL,
ALTER COLUMN "changePercentage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "historicalDataIndex" ALTER COLUMN "staticInfoIndexId" SET NOT NULL,
ALTER COLUMN "change" DROP NOT NULL,
ALTER COLUMN "changePercentage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "staticInfoBond" ADD COLUMN     "marketOfIssueId" INTEGER,
ALTER COLUMN "countryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "staticInfoCommo" ALTER COLUMN "ric" DROP NOT NULL,
ALTER COLUMN "ticker" DROP NOT NULL,
ALTER COLUMN "symbol" DROP NOT NULL,
ALTER COLUMN "currencyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "staticInfoCountry" ALTER COLUMN "countryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "staticInfoEquity" ALTER COLUMN "ric" DROP NOT NULL,
ALTER COLUMN "ticker" DROP NOT NULL,
ALTER COLUMN "symbol" DROP NOT NULL,
ALTER COLUMN "micCode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "staticInfoFund" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "staticInfoFx" DROP COLUMN "flag",
ADD COLUMN     "symbol" TEXT,
ALTER COLUMN "ric" DROP NOT NULL,
ALTER COLUMN "ticker" DROP NOT NULL,
ALTER COLUMN "currencyId1" SET NOT NULL,
ALTER COLUMN "currencyId2" SET NOT NULL,
ALTER COLUMN "countryId" SET NOT NULL,
ALTER COLUMN "countryId2" SET NOT NULL;

-- AlterTable
ALTER TABLE "staticInfoIndex" ALTER COLUMN "ric" DROP NOT NULL,
ALTER COLUMN "ticker" DROP NOT NULL,
ALTER COLUMN "symbol" DROP NOT NULL,
ALTER COLUMN "countryId" SET NOT NULL,
ALTER COLUMN "currencyId" SET NOT NULL;

-- DropEnum
DROP TYPE "CurrencyList";

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoCountry" ADD CONSTRAINT "staticInfoCountry_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historicalDataEquity" ADD CONSTRAINT "historicalDataEquity_staticInfoEquityId_fkey" FOREIGN KEY ("staticInfoEquityId") REFERENCES "staticInfoEquity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoCommo" ADD CONSTRAINT "staticInfoCommo_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historicalDataCommo" ADD CONSTRAINT "historicalDataCommo_staticInfoCommoId_fkey" FOREIGN KEY ("staticInfoCommoId") REFERENCES "staticInfoCommo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoIndex" ADD CONSTRAINT "staticInfoIndex_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoIndex" ADD CONSTRAINT "staticInfoIndex_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historicalDataIndex" ADD CONSTRAINT "historicalDataIndex_staticInfoIndexId_fkey" FOREIGN KEY ("staticInfoIndexId") REFERENCES "staticInfoIndex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoFx" ADD CONSTRAINT "staticInfoFx_countryId2_fkey" FOREIGN KEY ("countryId2") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoFx" ADD CONSTRAINT "staticInfoFx_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoFx" ADD CONSTRAINT "staticInfoFx_currencyId1_fkey" FOREIGN KEY ("currencyId1") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoFx" ADD CONSTRAINT "staticInfoFx_currencyId2_fkey" FOREIGN KEY ("currencyId2") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historicalDataFx" ADD CONSTRAINT "historicalDataFx_staticInfoFxId_fkey" FOREIGN KEY ("staticInfoFxId") REFERENCES "staticInfoFx"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoBond" ADD CONSTRAINT "staticInfoBond_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historicalDataBond" ADD CONSTRAINT "historicalDataBond_staticInfoBondId_fkey" FOREIGN KEY ("staticInfoBondId") REFERENCES "staticInfoBond"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
