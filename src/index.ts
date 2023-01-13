import puppeteer from 'puppeteer';

import { Espn } from './resultSources/espn'
import { Oddsshark } from './predictionSources/oddsshark'
import { parseMatchDate as toDateObject } from './utils/dateHandlers'
import { savePredictionsFile, saveResultsFile } from './utils/fileSystemHandlers';
import { MatchResultProvider } from './MatchResultProvider';
import { MatchPredictionProvider } from './getMatchPredictions';

(async () => {

  const browser = await puppeteer.launch({ headless: true });
  try {
    const scrappedPage = await browser.newPage();
    const matchDate = toDateObject(new Date('01/10/2023'));

    const espn = new Espn();
    const resultProvider = new MatchResultProvider(espn)
    const matchResults = await resultProvider.getMatchResults(scrappedPage, matchDate)
    saveResultsFile(matchResults);

    const oddsshark = new Oddsshark();
    const predictionProvider = new MatchPredictionProvider(oddsshark)
    const matchPredictions = await predictionProvider.getMatchPredictions(scrappedPage, matchDate)
    savePredictionsFile(matchPredictions)
  } finally {
    await browser.close();
  }
})();