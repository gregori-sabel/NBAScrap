import puppeteer from 'puppeteer';

import { Espn } from './resultSources/espn'
import { Oddsshark } from './predictionSources/oddsshark'
import { parseMatchDate as toDateObject } from './utils/dateHandlers'
import { savePredictionsFile, saveResultsFile } from './utils/fileSystemHandlers';
import { getMatchResults } from './getMatchResults';
import { getMatchPredictions } from './getMatchPredictions';

(async () => {

  const browser = await puppeteer.launch({ headless: true });
  const scrappedPage = await browser.newPage();
  const matchDate = toDateObject(new Date('01/10/2023'));

  const espn = new Espn();
  const matchResults = await getMatchResults(espn, scrappedPage, matchDate)
  saveResultsFile(matchResults);

  const oddsshark = new Oddsshark();
  const matchPredictions = await getMatchPredictions(oddsshark, scrappedPage, matchDate)
  savePredictionsFile(matchPredictions)

  await browser.close();
})();