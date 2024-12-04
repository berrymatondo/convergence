-- CreateTable
CREATE TABLE "historicalDataBond" (
    "id" SERIAL NOT NULL,
    "staticInfoBondId" INTEGER,
    "date" TEXT NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "changePercentage" DOUBLE PRECISION NOT NULL,
    "type" "YCTypesList" NOT NULL DEFAULT 'H',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historicalDataBond_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "historicalDataBond" ADD CONSTRAINT "historicalDataBond_staticInfoBondId_fkey" FOREIGN KEY ("staticInfoBondId") REFERENCES "staticInfoBond"("id") ON DELETE SET NULL ON UPDATE CASCADE;
