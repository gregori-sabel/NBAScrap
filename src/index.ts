import puppeteer from 'puppeteer';

import { EspnResultSource } from './resultSources/EspnResultSource'
import { Oddsshark } from './predictionSources/oddsshark'
import { toDateObject } from './utils/dateHandlers'
import { savePredictionsFile, saveResultsFile } from './utils/fileSystemHandlers';
import { MatchResultProvider } from './MatchResultProvider';
import { MatchPredictionProvider } from './MatchPredictionProvider';
import { CbsSports } from './predictionSources/cbssports';

(async () => {

  const browser = await puppeteer.launch({ headless: true });
  try {
    const scrappedPage = await browser.newPage();
    const matchDate = toDateObject(new Date('01/10/2023'));

<<<<<<< HEAD
    // const espn = new Espn();
    // const resultProvider = new MatchResultProvider(espn)
    // const matchResults = await resultProvider.getMatchResults(scrappedPage, matchDate)
    // saveResultsFile(matchResults);
=======
    const espn = new EspnResultSource();
    const resultProvider = new MatchResultProvider(espn)
    const matchResults = await resultProvider.getMatchResults(scrappedPage, matchDate)
    saveResultsFile(matchResults);
>>>>>>> f4375ce06554f6fed7f08a0cfb4dec8cc3962335

    // const oddsshark = new Oddsshark();
    // const predictionProvider = new MatchPredictionProvider(oddsshark)
    // const matchPredictions = await predictionProvider.getMatchPredictions(scrappedPage, matchDate)
    // savePredictionsFile(matchPredictions)

    const cbsSports = new CbsSports();
    const predictionProvider = new MatchPredictionProvider(cbsSports)
    const matchPredictions = await predictionProvider.getMatchPredictions(scrappedPage, matchDate)
    savePredictionsFile(matchPredictions)



  } finally {
    await browser.close();
  }
})();