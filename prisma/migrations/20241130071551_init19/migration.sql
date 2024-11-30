-- CreateTable
CREATE TABLE "historicalDataFx" (
    "id" SERIAL NOT NULL,
    "staticInfoFxId" INTEGER,
    "date" TEXT NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "changePercentage" DOUBLE PRECISION NOT NULL,
    "type" "YCTypesList" NOT NULL DEFAULT 'H',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historicalDataFx_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "historicalDataFx" ADD CONSTRAINT "historicalDataFx_staticInfoFxId_fkey" FOREIGN KEY ("staticInfoFxId") REFERENCES "staticInfoFx"("id") ON DELETE SET NULL ON UPDATE CASCADE;
