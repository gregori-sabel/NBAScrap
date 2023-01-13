import puppeteer from 'puppeteer';

import { Espn } from './resultSources/espn'
import { Oddsshark } from './predictionSources/oddsshark'
import { getDateList } from './utils/GetDateList'
import { ResultsDataSource, DayDataResult } from './types/resultTypes';
import { PredictionDataSource, DayDataPrediction } from './types/predictionTypes';
import { savePredictionsFile, saveResultsFile } from './fileSystemHandlers';

(async () => {

  const browser = await puppeteer.launch({ headless: true });
  const scrappedPage = await browser.newPage();

  const matchDate = new Date('01/10/2023'); // mes dia ano - palhaçada mas é assim
  const matchYear = matchDate.getFullYear() + '';
  const matchMonth = String(matchDate.getMonth() + 1).padStart(2, '0');
  const matchDay = String(matchDate.getDate()).padStart(2, '0');

  const dateAMDArray = getDateList('12/10/2022', '12/10/2022')
  console.log(dateAMDArray)

  async function getMatchResults(resultsDataSource: ResultsDataSource): Promise<DayDataResult> {
    const matchResultData = await resultsDataSource.getData(
      scrappedPage,
      { day: matchDay, month: matchMonth, year: matchYear }
    )

    console.log(matchResultData)

    return matchResultData;
  }

  async function getMatchPredictions(predictionDataSource: PredictionDataSource): Promise<DayDataPrediction> {
    const matchPredictionData = await predictionDataSource.getData(
      scrappedPage,
      { day: matchDay, month: matchMonth, year: matchYear }
    )
    console.log(matchPredictionData)

    return matchPredictionData
  }

  const espn = new Espn();
  const matchResults = await getMatchResults(espn)
  saveResultsFile(matchResults);

  const oddsshark = new Oddsshark();
  const matchPredictions = await getMatchPredictions(oddsshark)
  savePredictionsFile(matchPredictions)

  await browser.close();
})();