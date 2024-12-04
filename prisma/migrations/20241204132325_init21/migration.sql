-- CreateTable
CREATE TABLE "FundCustodiansMapping" (
    "id" SERIAL NOT NULL,
    "staticInfoFundId" INTEGER,
    "custodian" TEXT NOT NULL,

    CONSTRAINT "FundCustodiansMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundAdvisorsMapping" (
    "id" SERIAL NOT NULL,
    "staticInfoFundId" INTEGER,
    "advisor" TEXT NOT NULL,

    CONSTRAINT "FundAdvisorsMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundAdministratorsMapping" (
    "id" SERIAL NOT NULL,
    "staticInfoFundId" INTEGER,
    "administrator" TEXT NOT NULL,

    CONSTRAINT "FundAdministratorsMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundPromotersManagerMapping" (
    "id" SERIAL NOT NULL,
    "staticInfoFundId" INTEGER,
    "promoterManager" TEXT NOT NULL,

    CONSTRAINT "FundPromotersManagerMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundPromotersMapping" (
    "id" SERIAL NOT NULL,
    "staticInfoFundId" INTEGER,
    "promoter" TEXT NOT NULL,

    CONSTRAINT "FundPromotersMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FundCustodiansMapping_staticInfoFundId_idx" ON "FundCustodiansMapping"("staticInfoFundId");

-- CreateIndex
CREATE INDEX "FundAdvisorsMapping_staticInfoFundId_idx" ON "FundAdvisorsMapping"("staticInfoFundId");

-- CreateIndex
CREATE INDEX "FundAdministratorsMapping_staticInfoFundId_idx" ON "FundAdministratorsMapping"("staticInfoFundId");

-- CreateIndex
CREATE INDEX "FundPromotersManagerMapping_staticInfoFundId_idx" ON "FundPromotersManagerMapping"("staticInfoFundId");

-- CreateIndex
CREATE INDEX "FundPromotersMapping_staticInfoFundId_idx" ON "FundPromotersMapping"("staticInfoFundId");

-- AddForeignKey
ALTER TABLE "FundCustodiansMapping" ADD CONSTRAINT "FundCustodiansMapping_staticInfoFundId_fkey" FOREIGN KEY ("staticInfoFundId") REFERENCES "staticInfoFund"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundAdvisorsMapping" ADD CONSTRAINT "FundAdvisorsMapping_staticInfoFundId_fkey" FOREIGN KEY ("staticInfoFundId") REFERENCES "staticInfoFund"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundAdministratorsMapping" ADD CONSTRAINT "FundAdministratorsMapping_staticInfoFundId_fkey" FOREIGN KEY ("staticInfoFundId") REFERENCES "staticInfoFund"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundPromotersManagerMapping" ADD CONSTRAINT "FundPromotersManagerMapping_staticInfoFundId_fkey" FOREIGN KEY ("staticInfoFundId") REFERENCES "staticInfoFund"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundPromotersMapping" ADD CONSTRAINT "FundPromotersMapping_staticInfoFundId_fkey" FOREIGN KEY ("staticInfoFundId") REFERENCES "staticInfoFund"("id") ON DELETE SET NULL ON UPDATE CASCADE;
