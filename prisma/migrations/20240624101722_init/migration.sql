-- CreateEnum
CREATE TYPE "CurrencyList" AS ENUM ('USD', 'EUR', 'XAF');

-- CreateEnum
CREATE TYPE "SectorList" AS ENUM ('ENERGY', 'METALS', 'AGRICULTURE');

-- CreateTable
CREATE TABLE "staticInfoCommo" (
    "id" SERIAL NOT NULL,
    "assetName" TEXT NOT NULL,
    "currency" "CurrencyList" NOT NULL,
    "sector" "SectorList" NOT NULL,
    "ric" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,

    CONSTRAINT "staticInfoCommo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historicalDataCommo" (
    "id" SERIAL NOT NULL,
    "staticInfoCommoId" INTEGER,

    CONSTRAINT "historicalDataCommo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "historicalDataCommo" ADD CONSTRAINT "historicalDataCommo_staticInfoCommoId_fkey" FOREIGN KEY ("staticInfoCommoId") REFERENCES "staticInfoCommo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
