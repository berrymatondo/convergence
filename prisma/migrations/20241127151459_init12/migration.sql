/*
  Warnings:

  - You are about to drop the column `currency` on the `staticInfoCommo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "staticInfoCommo" DROP COLUMN "currency",
ADD COLUMN     "currencyId" INTEGER;

-- AddForeignKey
ALTER TABLE "staticInfoCommo" ADD CONSTRAINT "staticInfoCommo_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
