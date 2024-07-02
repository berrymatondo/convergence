/*
  Warnings:

  - You are about to drop the column `price` on the `historicalDataCommo` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `historicalDataCommo` table. All the data in the column will be lost.
  - You are about to drop the column `volume` on the `historicalDataCommo` table. All the data in the column will be lost.
  - Added the required column `change` to the `historicalDataCommo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `changePercentage` to the `historicalDataCommo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `close` to the `historicalDataCommo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "historicalDataCommo" DROP COLUMN "price",
DROP COLUMN "type",
DROP COLUMN "volume",
ADD COLUMN     "change" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "changePercentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "close" DOUBLE PRECISION NOT NULL;
