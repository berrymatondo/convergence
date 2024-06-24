/*
  Warnings:

  - Added the required column `date` to the `historicalDataCommo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `historicalDataCommo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `historicalDataCommo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volume` to the `historicalDataCommo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `staticInfoCommo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "historicalDataCommo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "type" "YCTypesList" NOT NULL DEFAULT 'H',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "volume" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "staticInfoCommo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
