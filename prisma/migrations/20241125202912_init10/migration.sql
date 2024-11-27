-- CreateEnum
CREATE TYPE "CreditRating" AS ENUM ('VISITOR', 'CLIENT', 'AGENT', 'ADMIN');

-- CreateTable
CREATE TABLE "staticInfoCountry" (
    "id" SERIAL NOT NULL,
    "countryId" INTEGER,
    "gdpGrowhtRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "interestRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "inflationRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unemploymentRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "balanceOfTrade" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "balanceOfTradeCurrency" TEXT,
    "creditRating" TEXT NOT NULL DEFAULT 'NR',
    "defaultProbability" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staticInfoCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staticInfoFx" (
    "id" SERIAL NOT NULL,
    "countryId" INTEGER,
    "pair" TEXT NOT NULL,
    "currency1" "CurrencyList" NOT NULL,
    "currency2" "CurrencyList" NOT NULL,
    "ric" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staticInfoFx_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staticInfoBond" (
    "id" SERIAL NOT NULL,
    "isin" TEXT,
    "description" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "countryId" INTEGER,
    "acf" "ACFList" NOT NULL,
    "maturity" TEXT,
    "issueDate" TEXT,
    "issuePrice" DOUBLE PRECISION NOT NULL,
    "amountIssuedUSD" DOUBLE PRECISION NOT NULL,
    "couponRate" DOUBLE PRECISION NOT NULL,
    "couponType" TEXT,
    "couponClass" TEXT,
    "couponFrequency" TEXT,
    "principalCurrency" "CurrencyList" NOT NULL,
    "couponCurrency" "CurrencyList" NOT NULL,
    "instrumentType" TEXT,
    "bondGrade" TEXT,
    "issuerType" TEXT,
    "marketOfIssue" TEXT,
    "domicile" TEXT,
    "sector" TEXT,
    "seniority" TEXT,
    "inflationLinked" BOOLEAN NOT NULL DEFAULT false,
    "dualCurrency" BOOLEAN NOT NULL DEFAULT false,
    "callable" BOOLEAN NOT NULL DEFAULT false,
    "putable" BOOLEAN NOT NULL DEFAULT false,
    "greenBond" BOOLEAN NOT NULL DEFAULT false,
    "guaranteed" BOOLEAN NOT NULL DEFAULT false,
    "marketPrice" BOOLEAN NOT NULL DEFAULT false,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staticInfoBond_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staticInfoFund" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "isin" TEXT,
    "lipperClassificationScheme" TEXT,
    "instrumentType" TEXT,
    "domicile" TEXT,
    "countryRegisteredForSale" TEXT,
    "currency" "CurrencyList" NOT NULL,
    "exchange" TEXT,
    "ric" TEXT,
    "exchangeiNAV" TEXT,
    "supportCompanyName" TEXT,
    "promoter" TEXT,
    "portfolioManager" TEXT,
    "custodian" TEXT,
    "advisor" TEXT,
    "administrator" TEXT,
    "sedol" TEXT,
    "wertpapier" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staticInfoFund_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staticInfoCountry_countryId_key" ON "staticInfoCountry"("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "staticInfoFx_countryId_key" ON "staticInfoFx"("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "staticInfoBond_isin_key" ON "staticInfoBond"("isin");

-- CreateIndex
CREATE UNIQUE INDEX "staticInfoFund_isin_key" ON "staticInfoFund"("isin");

-- AddForeignKey
ALTER TABLE "staticInfoCountry" ADD CONSTRAINT "staticInfoCountry_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoFx" ADD CONSTRAINT "staticInfoFx_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staticInfoBond" ADD CONSTRAINT "staticInfoBond_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
