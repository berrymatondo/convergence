-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "currencyId" INTEGER;

-- CreateTable
CREATE TABLE "currencies" (
    "id" SERIAL NOT NULL,
    "mic" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "currencies_mic_key" ON "currencies"("mic");

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "countries_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
