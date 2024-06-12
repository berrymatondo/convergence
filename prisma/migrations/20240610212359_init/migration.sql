/*
  Warnings:

  - The `continent` column on the `countries` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "countries_continent_key";

-- AlterTable
ALTER TABLE "countries" DROP COLUMN "continent",
ADD COLUMN     "continent" "ContinentsList" NOT NULL DEFAULT 'AFRIQUE';
