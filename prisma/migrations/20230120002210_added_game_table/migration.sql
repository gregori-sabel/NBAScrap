/*
  Warnings:

  - You are about to drop the column `awayTeamName` on the `Prediction` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamName` on the `Prediction` table. All the data in the column will be lost.
  - You are about to drop the column `resultId` on the `Prediction` table. All the data in the column will be lost.
  - You are about to drop the column `awayTeamName` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamName` on the `Result` table. All the data in the column will be lost.
  - Added the required column `gameId` to the `Prediction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_resultId_fkey";

-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "awayTeamName",
DROP COLUMN "homeTeamName",
DROP COLUMN "resultId",
ADD COLUMN     "gameId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "awayTeamName",
DROP COLUMN "date",
DROP COLUMN "homeTeamName",
ADD COLUMN     "gameId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "homeTeamName" TEXT NOT NULL,
    "awayTeamName" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
