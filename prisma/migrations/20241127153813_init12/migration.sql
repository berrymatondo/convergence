/*
  Warnings:

  - You are about to drop the column `couponCurrency` on the `staticInfoBond` table. All the data in the column will be lost.
  - You are about to drop the column `principalCurrency` on the `staticInfoBond` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `staticInfoEquity` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `staticInfoFund` table. All the data in the column will be lost.
  - You are about to drop the column `currency1` on the `staticInfoFx` table. All the data in the column will be lost.
  - You are about to drop the column `currency2` on the `staticInfoFx` table. All the data in the column will be lost.
  - You are about to drop the column `pair` on the `staticInfoFx` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `staticInfoIndex` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "staticInfoBond" DROP COLUMN "couponCurrency",
DROP COLUMN "principalCurrency",
ADD COLUMN     "couponCurrencyId" INTEGER,
ADD COLUMN     "principalCurrencyId" INTEGER;

-- AlterTable
ALTER TABLE "staticInfoEquity" DROP COLUMN "currency",
ADD COLUMN     "currencyId" INTEGER;

-- AlterTable
ALTER TABLE "staticInfoFund" DROP COLUMN "currency",
ADD COLUMN     "currencyId" INTEGER;

-- AlterTable
ALTER TABLE "staticInfoFx" DROP COLUMN "currency1",
DROP COLUMN "currency2",
DROP COLUMN "pair",
ADD COLUMN     "currencyId1" INTEGER,
ADD COLUMN     "currencyId2" INTEGER;

-- AlterTable
ALTER TABLE "staticInfoIndex" DROP COLUMN "currency",
ADD COLUMN     "currencyId" INTEGER;

-- AddForeignKey
ALTER TABLE "staticInfoEquity" ADD CONSTRAINT "staticInfoEquity_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoIndex" ADD CONSTRAINT "staticInfoIndex_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoFx" ADD CONSTRAINT "staticInfoFx_currencyId1_fkey" FOREIGN KEY ("currencyId1") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoFx" ADD CONSTRAINT "staticInfoFx_currencyId2_fkey" FOREIGN KEY ("currencyId2") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoBond" ADD CONSTRAINT "staticInfoBond_principalCurrencyId_fkey" FOREIGN KEY ("principalCurrencyId") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoBond" ADD CONSTRAINT "staticInfoBond_couponCurrencyId_fkey" FOREIGN KEY ("couponCurrencyId") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoFund" ADD CONSTRAINT "staticInfoFund_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
