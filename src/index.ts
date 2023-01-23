import puppeteer from 'puppeteer';

import { Oddsshark } from './sources/predictionSources/oddsshark'
import { toDateObject } from './utils/dateHandlers'
import { savePredictionsFile, saveResultsFile } from './utils/fileSystemHandlers';
import { MatchPredictionProvider } from './MatchPredictionProvider';
import { Cbssports } from './sources/predictionSources/cbssports';
import { Oddstrader } from './sources/predictionSources/oddstrader';
import { EspnResultSource } from './sources/resultSources/EspnResultSource'
import { PredictionDataSource } from './types/predictionTypes';
import { MatchResultProvider } from './MatchResultProvider';
import { ResultDataSource } from './types/resultTypes';
import { ResultRepository } from './repositories/resultRepository';
import { ResultUseCases } from './controllers/resultUseCases';

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

    // const oddstraderPredictionSource = new Oddstrader();
    // const cbssportsPredictionSource = new Cbssports();
    // const oddssharkPredictionSource = new Oddsshark();
    // const espnPredictionSource = new EspnResultSource();

    // await getPredictionsAndSave(oddstraderPredictionSource, 'oddstrader')    
    // await getPredictionsAndSave(cbssportsPredictionSource, 'cbssports')
    // await getPredictionsAndSave(oddssharkPredictionSource, 'oddsshark')    
    // await getResultsAndSave(espnPredictionSource, 'espn')

    const resultToSave = {
      away: {
        name: 'time de teste',
        points: '234',
      },
      home: {
        name: 'HomeTeamTest',
        points: '34'
      }
    }

    // const resultRepository = new ResultRepository()
    // resultRepository.createResult(resultToSave)



    const resultUseCases = new ResultUseCases()
    resultUseCases.saveResult(resultToSave)


  } finally {
    await browser.close();
  }
})();