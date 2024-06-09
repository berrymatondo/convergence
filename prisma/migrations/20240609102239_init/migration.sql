-- CreateEnum
CREATE TYPE "ContactStatuses" AS ENUM ('NOUVEAU', 'ENCOURS', 'TERMINE');

-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "status" "ContactStatuses" NOT NULL DEFAULT 'NOUVEAU';
