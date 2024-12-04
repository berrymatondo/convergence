-- AlterTable
ALTER TABLE "staticInfoCountry" ALTER COLUMN "gdpGrowhtRate" DROP NOT NULL,
ALTER COLUMN "interestRate" DROP NOT NULL,
ALTER COLUMN "inflationRate" DROP NOT NULL,
ALTER COLUMN "unemploymentRate" DROP NOT NULL,
ALTER COLUMN "balanceOfTrade" DROP NOT NULL,
ALTER COLUMN "defaultProbability" DROP NOT NULL,
ALTER COLUMN "debtToGdp" DROP NOT NULL;
