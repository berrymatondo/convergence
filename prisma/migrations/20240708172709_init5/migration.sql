/*
  Warnings:

  - The values [ACF_1,ACF_2] on the enum `ACFList` will be removed. If these variants are still used in the database, this will fail.
  - The values [OECD,EMERGING] on the enum `MarketList` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ACFList_new" AS ENUM ('1', '2');
ALTER TABLE "staticInfoIndex" ALTER COLUMN "acf" TYPE "ACFList_new" USING ("acf"::text::"ACFList_new");
ALTER TYPE "ACFList" RENAME TO "ACFList_old";
ALTER TYPE "ACFList_new" RENAME TO "ACFList";
DROP TYPE "ACFList_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "MarketList_new" AS ENUM ('1', '2');
ALTER TYPE "MarketList" RENAME TO "MarketList_old";
ALTER TYPE "MarketList_new" RENAME TO "MarketList";
DROP TYPE "MarketList_old";
COMMIT;
