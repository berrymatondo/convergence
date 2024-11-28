-- DropForeignKey
ALTER TABLE "staticInfoBond" DROP CONSTRAINT "staticInfoBond_domicileId_fkey";

-- AddForeignKey
ALTER TABLE "staticInfoBond" ADD CONSTRAINT "staticInfoBond_domicileId_fkey" FOREIGN KEY ("domicileId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
