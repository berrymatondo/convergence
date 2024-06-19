-- CreateEnum
CREATE TYPE "AssetTypesList" AS ENUM ('INDEX', 'EQUITY', 'BOND');

-- CreateTable
CREATE TABLE "staticinfoaction" (
    "id" SERIAL NOT NULL,
    "assetName" TEXT NOT NULL,
    "isin" TEXT NOT NULL,
    "assetType" "AssetTypesList" NOT NULL,

    CONSTRAINT "staticinfoaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staticinfoaction_isin_key" ON "staticinfoaction"("isin");
