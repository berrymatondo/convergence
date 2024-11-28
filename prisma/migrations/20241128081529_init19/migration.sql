/*
  Warnings:

  - You are about to drop the column `domicile` on the `staticInfoBond` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "staticInfoBond" DROP COLUMN "domicile",
ADD COLUMN     "domicileId" INTEGER,
ALTER COLUMN "issuePrice" DROP NOT NULL,
ALTER COLUMN "amountIssuedUSD" DROP NOT NULL,
ALTER COLUMN "couponRate" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "staticInfoBond" ADD CONSTRAINT "staticInfoBond_domicileId_fkey" FOREIGN KEY ("domicileId") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
