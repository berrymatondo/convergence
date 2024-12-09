/*
  Warnings:

  - A unique constraint covering the columns `[staticInfoCommoId,date]` on the table `historicalDataCommo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "historicalDataCommo_staticInfoCommoId_idx" ON "historicalDataCommo"("staticInfoCommoId");

-- CreateIndex
CREATE UNIQUE INDEX "historicalDataCommo_staticInfoCommoId_date_key" ON "historicalDataCommo"("staticInfoCommoId" DESC, "date");
