/*
  Warnings:

  - You are about to drop the `staticinfoaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "staticinfoaction";

-- CreateTable
CREATE TABLE "staticinfoequity" (
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

    CONSTRAINT "staticinfoequity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staticinfoequity_isin_key" ON "staticinfoequity"("isin");
