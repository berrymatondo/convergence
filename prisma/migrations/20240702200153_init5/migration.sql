-- CreateEnum
CREATE TYPE "ACFList" AS ENUM ('ACF_1', 'ACF_2');

-- CreateTable
CREATE TABLE "staticInfoIndex" (
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staticInfoIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historicalDataIndex" (
    "id" SERIAL NOT NULL,
    "staticInfoIndexId" INTEGER,
    "date" TEXT NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "changePercentage" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "historicalDataIndex_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staticInfoIndex_isin_key" ON "staticInfoIndex"("isin");

-- AddForeignKey
ALTER TABLE "historicalDataIndex" ADD CONSTRAINT "historicalDataIndex_staticInfoIndexId_fkey" FOREIGN KEY ("staticInfoIndexId") REFERENCES "staticInfoIndex"("id") ON DELETE SET NULL ON UPDATE CASCADE;
