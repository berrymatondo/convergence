-- AlterTable
ALTER TABLE "staticInfoFx" ADD COLUMN     "countryId2" INTEGER;

-- AddForeignKey
ALTER TABLE "staticInfoFx" ADD CONSTRAINT "staticInfoFx_countryId2_fkey" FOREIGN KEY ("countryId2") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
