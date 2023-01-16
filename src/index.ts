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
import { ResultDataSource } from './types/resultTypes';

(async () => {

  const browser = await puppeteer.launch({ headless: true });
  try {
    const matchDate = toDateObject(new Date('01/10/2023'));

    async function getPredictionsAndSave(provider: PredictionDataSource, siteName: string) {
      const predictionProvider = new MatchPredictionProvider(provider)
      const matchPredictions = await predictionProvider.getMatchPredictions(browser, matchDate)
      savePredictionsFile(matchPredictions, siteName)      
    }
    
    async function getResultsAndSave(provider: ResultDataSource, siteName: string) {
      const resultProvider = new MatchResultProvider(provider)
      const matchResults = await resultProvider.getMatchResults(browser, matchDate)
      saveResultsFile(matchResults, siteName); 
    }

    const oddstraderPredictionSource = new Oddstrader();
    const cbssportsPredictionSource = new Cbssports();
    const oddssharkPredictionSource = new Oddsshark();
    const espnPredictionSource = new EspnResultSource();

    await getPredictionsAndSave(oddstraderPredictionSource, 'oddstrader')    
    await getPredictionsAndSave(cbssportsPredictionSource, 'cbssports')
    await getPredictionsAndSave(oddssharkPredictionSource, 'oddsshark')    
    await getResultsAndSave(espnPredictionSource, 'espn')




  } finally {
    await browser.close();
  }
})();