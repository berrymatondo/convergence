-- CreateEnum
CREATE TYPE "YCTypesList" AS ENUM ('L', 'H');

-- AlterTable
ALTER TABLE "yieldcurve" ADD COLUMN     "type" "YCTypesList" NOT NULL DEFAULT 'H';
