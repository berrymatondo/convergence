/*
  Warnings:

  - You are about to drop the `staticinfoequity` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CountryList" ADD VALUE 'EMERGING_MARKETS';
ALTER TYPE "CountryList" ADD VALUE 'GLOBAL';
ALTER TYPE "CountryList" ADD VALUE 'HONG_KONG';
ALTER TYPE "CountryList" ADD VALUE 'SOUTH_KOREA';

-- AlterEnum
ALTER TYPE "CurrencyList" ADD VALUE 'HKD';

-- DropForeignKey
ALTER TABLE "historicalDataEquity" DROP CONSTRAINT "historicalDataEquity_staticInfoEquityId_fkey";

-- AlterTable
ALTER TABLE "historicalDataCommo" ADD COLUMN     "type" "YCTypesList" NOT NULL DEFAULT 'H';

-- AlterTable
ALTER TABLE "historicalDataEquity" ALTER COLUMN "type" SET DEFAULT 'H';

-- AlterTable
ALTER TABLE "historicalDataIndex" ADD COLUMN     "type" "YCTypesList" NOT NULL DEFAULT 'H';

-- DropTable
DROP TABLE "staticinfoequity";

-- CreateTable
CREATE TABLE "staticInfoEquity" (
    "id" SERIAL NOT NULL,
    "assetName" TEXT NOT NULL,
    "isin" TEXT NOT NULL,
    "currency" "CurrencyList" NOT NULL,
    "country" "CountryList" NOT NULL,
    "sector" "SectorList" NOT NULL,
    "acf" "ACFList" NOT NULL,
    "ric" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "staticInfoEquity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staticInfoEquity_isin_key" ON "staticInfoEquity"("isin");

-- AddForeignKey
ALTER TABLE "historicalDataEquity" ADD CONSTRAINT "historicalDataEquity_staticInfoEquityId_fkey" FOREIGN KEY ("staticInfoEquityId") REFERENCES "staticInfoEquity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
