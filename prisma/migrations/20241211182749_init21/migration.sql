-- CreateIndex
CREATE INDEX "historicalDataBond_staticInfoBondId_type_idx" ON "historicalDataBond"("staticInfoBondId", "type");

-- CreateIndex
CREATE INDEX "historicalDataCommo_staticInfoCommoId_type_idx" ON "historicalDataCommo"("staticInfoCommoId", "type");

-- CreateIndex
CREATE INDEX "historicalDataEquity_staticInfoEquityId_type_idx" ON "historicalDataEquity"("staticInfoEquityId", "type");

-- CreateIndex
CREATE INDEX "historicalDataIndex_staticInfoIndexId_type_idx" ON "historicalDataIndex"("staticInfoIndexId", "type");
