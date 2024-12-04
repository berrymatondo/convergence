-- CreateTable
CREATE TABLE "FundCountryRegisteredForSales" (
    "countryId" INTEGER NOT NULL,
    "staticInfoFundId" INTEGER NOT NULL,

    CONSTRAINT "FundCountryRegisteredForSales_pkey" PRIMARY KEY ("countryId","staticInfoFundId")
);

-- AddForeignKey
ALTER TABLE "FundCountryRegisteredForSales" ADD CONSTRAINT "FundCountryRegisteredForSales_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundCountryRegisteredForSales" ADD CONSTRAINT "FundCountryRegisteredForSales_staticInfoFundId_fkey" FOREIGN KEY ("staticInfoFundId") REFERENCES "staticInfoFund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
