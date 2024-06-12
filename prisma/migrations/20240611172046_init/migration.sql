/*
  Warnings:

  - A unique constraint covering the columns `[order,countryId]` on the table `gos` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "gos_order_key";

-- CreateIndex
CREATE UNIQUE INDEX "gos_order_countryId_key" ON "gos"("order", "countryId");
