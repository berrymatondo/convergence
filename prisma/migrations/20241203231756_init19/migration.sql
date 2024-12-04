/*
  Warnings:

  - You are about to drop the `CountryEquityIndexMapping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CountryEquityIndexMapping" DROP CONSTRAINT "CountryEquityIndexMapping_countryId_fkey";

-- DropForeignKey
ALTER TABLE "CountryEquityIndexMapping" DROP CONSTRAINT "CountryEquityIndexMapping_staticInfoIndexId_fkey";

-- DropTable
DROP TABLE "CountryEquityIndexMapping";

-- CreateTable
CREATE TABLE "CountryIndexMapping" (
    "countryId" INTEGER NOT NULL,
    "staticInfoIndexId" INTEGER NOT NULL,
    "assetTypesList" "AssetTypesList",

    CONSTRAINT "CountryIndexMapping_pkey" PRIMARY KEY ("countryId","staticInfoIndexId")
);

-- AddForeignKey
ALTER TABLE "CountryIndexMapping" ADD CONSTRAINT "CountryIndexMapping_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountryIndexMapping" ADD CONSTRAINT "CountryIndexMapping_staticInfoIndexId_fkey" FOREIGN KEY ("staticInfoIndexId") REFERENCES "staticInfoIndex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
