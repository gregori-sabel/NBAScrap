import puppeteer from 'puppeteer';
import fs from 'fs'

import { Espn } from './resultSources/espn'
import { Oddsshark } from './predictionSources/oddsshark'
import { getDateList } from './utils/GetDateList'
import { GameResult, ResultsDataSource } from './types/resultTypes';
import { GamePrediction, PredictionDataSource } from './types/predictionTypes';
import { match } from 'assert';



export interface DayDataResult {
  date: string,
  games: GameResult[]
}

export interface DayDataPrediction {
  date: string,
  games: GamePrediction[]
}


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
    const matchData = await resultsDataSource.getData(
      scrappedPage,
      { day: matchDay, month: matchMonth, year: matchYear }
    )

    console.log(matchData)

    return matchData;
  }

  async function getPredicts(predictionDataSource: PredictionDataSource) {
    const gamesData = await predictionDataSource.getData(scrappedPage, { day: matchDay, month: matchMonth, year: matchYear })
    console.log(gamesData)

    fs.writeFile(
      "./src/temp/predictions/" + gamesData.date.replaceAll('/', '-') + '.json',
      JSON.stringify(gamesData),
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
  }

  const espn = new Espn();
  const matchResults = await getMatchResults(espn)
  fs.writeFile(
    "./src/temp/results/" + matchResults.date.replaceAll('/', '-') + '-results' + '.json',
    JSON.stringify(matchResults),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

  const oddsshark = new Oddsshark();
  await getPredicts(oddsshark)

  await browser.close();
})();