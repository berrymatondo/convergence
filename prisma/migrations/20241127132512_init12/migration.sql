/*
  Warnings:

  - Added the required column `micCode` to the `staticInfoEquity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "staticInfoEquity" ADD COLUMN     "micCode" TEXT NOT NULL;
