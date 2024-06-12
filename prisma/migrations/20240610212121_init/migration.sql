/*
  Warnings:

  - You are about to drop the column `address` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[continent]` on the table `countries` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `continent` to the `countries` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContinentsList" AS ENUM ('AFRIQUE', 'AMERIQUE', 'ASIE', 'EUROPE', 'OCEANIE');

-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_countryId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_companyId_fkey";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "address",
DROP COLUMN "countryId",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "continent" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "companyId",
ADD COLUMN     "countryId" INTEGER;

-- CreateTable
CREATE TABLE "gos" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "companyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gos_order_key" ON "gos"("order");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_continent_key" ON "countries"("continent");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gos" ADD CONSTRAINT "gos_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
