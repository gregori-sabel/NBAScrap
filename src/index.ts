import puppeteer from 'puppeteer';

import { Oddsshark } from './predictionSources/oddsshark'
import { toDateObject } from './utils/dateHandlers'
import { savePredictionsFile } from './utils/fileSystemHandlers';
import { MatchPredictionProvider } from './MatchPredictionProvider';
import { Cbssports } from './predictionSources/cbssports';
import { Oddstrader } from './predictionSources/oddstrader';
import { PredictionDataSource } from './types/predictionTypes';

(async () => {

  const browser = await puppeteer.launch({ headless: true });
  try {
    const matchDate = toDateObject(new Date('01/10/2023'));

    // const espn = new Espn();
    // const resultProvider = new MatchResultProvider(espn)
    // const matchResults = await resultProvider.getMatchResults(scrappedPage, matchDate)
    // saveResultsFile(matchResults);


    async function getPredictionsAndSave(provider: PredictionDataSource, siteName: string) {
      const predictionProvider = new MatchPredictionProvider(provider)
      const matchPredictions = await predictionProvider.getMatchPredictions(browser, matchDate)
      savePredictionsFile(matchPredictions, siteName)      
    }

    const oddstrader = new Oddstrader();
    const cbssports = new Cbssports();
    const oddsshark = new Oddsshark();

    await getPredictionsAndSave(oddstrader, 'oddstrader')    
    await getPredictionsAndSave(cbssports, 'cbssports')
    await getPredictionsAndSave(oddsshark, 'oddsshark')



  } finally {
    await browser.close();
  }
})();