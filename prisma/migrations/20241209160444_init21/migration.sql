/*
  Warnings:

  - A unique constraint covering the columns `[staticInfoBondId,date]` on the table `historicalDataBond` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staticInfoEquityId,date]` on the table `historicalDataEquity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staticInfoFxId,date]` on the table `historicalDataFx` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staticInfoIndexId,date]` on the table `historicalDataIndex` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "historicalDataBond_staticInfoBondId_idx" ON "historicalDataBond"("staticInfoBondId");

-- CreateIndex
CREATE UNIQUE INDEX "historicalDataBond_staticInfoBondId_date_key" ON "historicalDataBond"("staticInfoBondId" DESC, "date");

-- CreateIndex
CREATE INDEX "historicalDataEquity_staticInfoEquityId_idx" ON "historicalDataEquity"("staticInfoEquityId");

-- CreateIndex
CREATE UNIQUE INDEX "historicalDataEquity_staticInfoEquityId_date_key" ON "historicalDataEquity"("staticInfoEquityId" DESC, "date");

-- CreateIndex
CREATE INDEX "historicalDataFx_staticInfoFxId_idx" ON "historicalDataFx"("staticInfoFxId");

-- CreateIndex
CREATE UNIQUE INDEX "historicalDataFx_staticInfoFxId_date_key" ON "historicalDataFx"("staticInfoFxId" DESC, "date");

-- CreateIndex
CREATE INDEX "historicalDataIndex_staticInfoIndexId_idx" ON "historicalDataIndex"("staticInfoIndexId");

-- CreateIndex
CREATE UNIQUE INDEX "historicalDataIndex_staticInfoIndexId_date_key" ON "historicalDataIndex"("staticInfoIndexId" DESC, "date");
