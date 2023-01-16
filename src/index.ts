import puppeteer from 'puppeteer';

import { Oddsshark } from './predictionSources/oddsshark'
import { toDateObject } from './utils/dateHandlers'
import { savePredictionsFile, saveResultsFile } from './utils/fileSystemHandlers';
import { MatchPredictionProvider } from './MatchPredictionProvider';
import { Cbssports } from './predictionSources/cbssports';
import { Oddstrader } from './predictionSources/oddstrader';
import { EspnResultSource } from './resultSources/EspnResultSource'
import { PredictionDataSource } from './types/predictionTypes';
import { MatchResultProvider } from './MatchResultProvider';

(async () => {

  const browser = await puppeteer.launch({ headless: true });
  try {
    const matchDate = toDateObject(new Date('01/10/2023'));

    async function getPredictionsAndSave(provider: PredictionDataSource, siteName: string) {
      const predictionProvider = new MatchPredictionProvider(provider)
      const matchPredictions = await predictionProvider.getMatchPredictions(browser, matchDate)
      savePredictionsFile(matchPredictions, siteName)      
    }

    // const oddstrader = new Oddstrader();
    // const cbssports = new Cbssports();
    // const oddsshark = new Oddsshark();

    // await getPredictionsAndSave(oddstrader, 'oddstrader')    
    // await getPredictionsAndSave(cbssports, 'cbssports')
    // await getPredictionsAndSave(oddsshark, 'oddsshark')

    const espn = new EspnResultSource();
    const resultProvider = new MatchResultProvider(espn)
    const matchResults = await resultProvider.getMatchResults(browser, matchDate)
    saveResultsFile(matchResults);




  } finally {
    await browser.close();
  }
})();