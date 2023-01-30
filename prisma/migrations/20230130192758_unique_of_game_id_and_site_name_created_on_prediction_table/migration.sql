/*
  Warnings:

  - A unique constraint covering the columns `[gameId,siteName]` on the table `Prediction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Prediction_gameId_siteName_key" ON "Prediction"("gameId", "siteName");
