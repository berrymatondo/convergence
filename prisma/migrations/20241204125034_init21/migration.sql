-- CreateTable
CREATE TABLE "EquityIndexMapping" (
    "equityId" INTEGER NOT NULL,
    "indexId" INTEGER NOT NULL,

    CONSTRAINT "EquityIndexMapping_pkey" PRIMARY KEY ("equityId","indexId")
);

-- AddForeignKey
ALTER TABLE "EquityIndexMapping" ADD CONSTRAINT "EquityIndexMapping_equityId_fkey" FOREIGN KEY ("equityId") REFERENCES "staticInfoEquity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquityIndexMapping" ADD CONSTRAINT "EquityIndexMapping_indexId_fkey" FOREIGN KEY ("indexId") REFERENCES "staticInfoIndex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
