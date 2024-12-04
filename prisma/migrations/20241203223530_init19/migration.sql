/*
  Warnings:

  - You are about to drop the `CountryOnStaticInfoFx` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CountryOnStaticInfoFx" DROP CONSTRAINT "CountryOnStaticInfoFx_countryId_fkey";

-- DropForeignKey
ALTER TABLE "CountryOnStaticInfoFx" DROP CONSTRAINT "CountryOnStaticInfoFx_staticInfoFxId_fkey";

-- AlterTable
ALTER TABLE "staticInfoFx" ADD COLUMN     "countryId" INTEGER,
ADD COLUMN     "countryId2" INTEGER;

-- DropTable
DROP TABLE "CountryOnStaticInfoFx";

-- CreateTable
CREATE TABLE "FxMapping" (
    "countryId" INTEGER NOT NULL,
    "staticInfoFxId" INTEGER NOT NULL,

    CONSTRAINT "FxMapping_pkey" PRIMARY KEY ("countryId","staticInfoFxId")
);

-- AddForeignKey
ALTER TABLE "staticInfoFx" ADD CONSTRAINT "staticInfoFx_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoFx" ADD CONSTRAINT "staticInfoFx_countryId2_fkey" FOREIGN KEY ("countryId2") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FxMapping" ADD CONSTRAINT "FxMapping_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FxMapping" ADD CONSTRAINT "FxMapping_staticInfoFxId_fkey" FOREIGN KEY ("staticInfoFxId") REFERENCES "staticInfoFx"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
