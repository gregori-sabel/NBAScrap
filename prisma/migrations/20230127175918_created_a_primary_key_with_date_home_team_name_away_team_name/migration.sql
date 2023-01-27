/*
  Warnings:

  - A unique constraint covering the columns `[date,homeTeamName,awayTeamName]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Game_date_homeTeamName_awayTeamName_key" ON "Game"("date", "homeTeamName", "awayTeamName");
