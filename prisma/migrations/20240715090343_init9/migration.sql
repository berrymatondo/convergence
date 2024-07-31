/*
  Warnings:

  - Added the required column `type` to the `historicalDataEquity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "historicalDataEquity" ADD COLUMN     "type" "YCTypesList" NOT NULL;
