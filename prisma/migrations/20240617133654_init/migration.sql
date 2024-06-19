/*
  Warnings:

  - A unique constraint covering the columns `[tenor,date,countryId,continent]` on the table `yieldcurve` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "yieldcurve" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "yieldcurve_tenor_date_countryId_continent_key" ON "yieldcurve"("tenor", "date", "countryId", "continent");
