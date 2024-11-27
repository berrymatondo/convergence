/*
  Warnings:

  - The values [AFRIQUE,AMERIQUE,ASIE,OCEANIE] on the enum `ContinentsList` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `country` on the `staticInfoEquity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `country` on the `staticInfoIndex` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContinentsList_new" AS ENUM ('AFRICA', 'AMERICA', 'ASIA', 'EUROPE', 'OCEANIA');
ALTER TABLE "countries" ALTER COLUMN "continent" DROP DEFAULT;
ALTER TABLE "countries" ALTER COLUMN "continent" TYPE "ContinentsList_new" USING ("continent"::text::"ContinentsList_new");
ALTER TABLE "yieldcurve" ALTER COLUMN "continent" TYPE "ContinentsList_new" USING ("continent"::text::"ContinentsList_new");
ALTER TYPE "ContinentsList" RENAME TO "ContinentsList_old";
ALTER TYPE "ContinentsList_new" RENAME TO "ContinentsList";
DROP TYPE "ContinentsList_old";
ALTER TABLE "countries" ALTER COLUMN "continent" SET DEFAULT 'AFRICA';
COMMIT;

-- AlterTable
ALTER TABLE "countries" ALTER COLUMN "continent" SET DEFAULT 'AFRICA';

-- AlterTable
ALTER TABLE "staticInfoEquity" DROP COLUMN "country",
ADD COLUMN     "country" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "staticInfoIndex" DROP COLUMN "country",
ADD COLUMN     "country" TEXT NOT NULL;

-- DropEnum
DROP TYPE "CountryList";
