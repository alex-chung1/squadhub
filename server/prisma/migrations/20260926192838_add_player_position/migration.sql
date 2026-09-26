-- CreateEnum
CREATE TYPE "Position" AS ENUM ('ATT', 'MID', 'DEF');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "position" "Position" NOT NULL DEFAULT 'MID';
