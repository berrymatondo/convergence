/*
  Warnings:

  - You are about to drop the column `countryId` on the `staticInfoFx` table. All the data in the column will be lost.
  - You are about to drop the column `countryId2` on the `staticInfoFx` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "staticInfoFx" DROP CONSTRAINT "staticInfoFx_countryId2_fkey";

-- DropForeignKey
ALTER TABLE "staticInfoFx" DROP CONSTRAINT "staticInfoFx_countryId_fkey";

-- AlterTable
ALTER TABLE "staticInfoFx" DROP COLUMN "countryId",
DROP COLUMN "countryId2";

-- CreateTable
CREATE TABLE "CountryOnStaticInfoFx" (
    "countryId" INTEGER NOT NULL,
    "staticInfoFxId" INTEGER NOT NULL,

    CONSTRAINT "CountryOnStaticInfoFx_pkey" PRIMARY KEY ("countryId","staticInfoFxId")
);

-- AddForeignKey
ALTER TABLE "CountryOnStaticInfoFx" ADD CONSTRAINT "CountryOnStaticInfoFx_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountryOnStaticInfoFx" ADD CONSTRAINT "CountryOnStaticInfoFx_staticInfoFxId_fkey" FOREIGN KEY ("staticInfoFxId") REFERENCES "staticInfoFx"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
