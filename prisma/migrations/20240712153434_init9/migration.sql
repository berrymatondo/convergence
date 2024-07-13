-- CreateTable
CREATE TABLE "historicalDataEquity" (
    "id" SERIAL NOT NULL,
    "staticInfoEquityId" INTEGER,
    "date" TEXT NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "changePercentage" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "historicalDataEquity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "historicalDataEquity" ADD CONSTRAINT "historicalDataEquity_staticInfoEquityId_fkey" FOREIGN KEY ("staticInfoEquityId") REFERENCES "staticinfoequity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
