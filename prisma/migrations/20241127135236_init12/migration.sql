/*
  Warnings:

  - You are about to drop the column `administrator` on the `staticInfoFund` table. All the data in the column will be lost.
  - You are about to drop the column `advisor` on the `staticInfoFund` table. All the data in the column will be lost.
  - You are about to drop the column `custodian` on the `staticInfoFund` table. All the data in the column will be lost.
  - You are about to drop the column `domicile` on the `staticInfoFund` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioManager` on the `staticInfoFund` table. All the data in the column will be lost.
  - You are about to drop the column `promoter` on the `staticInfoFund` table. All the data in the column will be lost.
  - You are about to drop the column `supportCompanyName` on the `staticInfoFund` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "staticInfoFund" DROP COLUMN "administrator",
DROP COLUMN "advisor",
DROP COLUMN "custodian",
DROP COLUMN "domicile",
DROP COLUMN "portfolioManager",
DROP COLUMN "promoter",
DROP COLUMN "supportCompanyName";
