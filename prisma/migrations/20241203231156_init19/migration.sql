-- CreateTable
CREATE TABLE "CountryEquityIndexMapping" (
    "countryId" INTEGER NOT NULL,
    "staticInfoIndexId" INTEGER NOT NULL,

    CONSTRAINT "CountryEquityIndexMapping_pkey" PRIMARY KEY ("countryId","staticInfoIndexId")
);

-- AddForeignKey
ALTER TABLE "CountryEquityIndexMapping" ADD CONSTRAINT "CountryEquityIndexMapping_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountryEquityIndexMapping" ADD CONSTRAINT "CountryEquityIndexMapping_staticInfoIndexId_fkey" FOREIGN KEY ("staticInfoIndexId") REFERENCES "staticInfoIndex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
