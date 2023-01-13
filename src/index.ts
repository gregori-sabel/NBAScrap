import puppeteer from 'puppeteer';

import { Espn } from './resultSources/espn'
import { Oddsshark } from './predictionSources/oddsshark'
import { parseMatchDate } from './utils/dateHandlers'
import { ResultsDataSource, DayDataResult } from './types/resultTypes';
import { PredictionDataSource, DayDataPrediction } from './types/predictionTypes';
import { savePredictionsFile, saveResultsFile } from './utils/fileSystemHandlers';

(async () => {

  const browser = await puppeteer.launch({ headless: true });
  const scrappedPage = await browser.newPage();
  const { matchDay, matchMonth, matchYear } = parseMatchDate(new Date('01/10/2023'));

  async function getMatchResults(resultsDataSource: ResultsDataSource): Promise<DayDataResult> {
    return await resultsDataSource.getData(
      scrappedPage,
      { day: matchDay, month: matchMonth, year: matchYear }
    )
  }

  async function getMatchPredictions(predictionDataSource: PredictionDataSource): Promise<DayDataPrediction> {
    return await predictionDataSource.getData(
      scrappedPage,
      { day: matchDay, month: matchMonth, year: matchYear }
    )
  }

  const espn = new Espn();
  const matchResults = await getMatchResults(espn)
  saveResultsFile(matchResults);

  const oddsshark = new Oddsshark();
  const matchPredictions = await getMatchPredictions(oddsshark)
  savePredictionsFile(matchPredictions)

  await browser.close();
})();