-- CreateTable
CREATE TABLE "yieldcurve" (
    "id" SERIAL NOT NULL,
    "tenor" INTEGER NOT NULL,
    "yield" DOUBLE PRECISION NOT NULL,
    "continent" "ContinentsList",
    "countryId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "yieldcurve_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "yieldcurve" ADD CONSTRAINT "yieldcurve_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
