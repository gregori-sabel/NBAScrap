/*
  Warnings:

  - You are about to drop the column `date` on the `Prediction` table. All the data in the column will be lost.
  - Added the required column `date` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "date",
ADD COLUMN     "especificDate" TIMESTAMP(3),
ALTER COLUMN "homeTeamName" DROP NOT NULL,
ALTER COLUMN "awayTeamName" DROP NOT NULL,
ALTER COLUMN "homeTeamScore" DROP NOT NULL,
ALTER COLUMN "awayTeamScore" DROP NOT NULL,
ALTER COLUMN "overValue" DROP NOT NULL,
ALTER COLUMN "overConsensus" DROP NOT NULL,
ALTER COLUMN "spreadValue" DROP NOT NULL,
ALTER COLUMN "spreadConcensus" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
