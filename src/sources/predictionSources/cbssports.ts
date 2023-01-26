// https://www.cbssports.com/nba/expert-picks/20230105/

// nesse aqui tambem conseguimos pegar o passado.
// e o legal é que conseguimos tambem pegar o resultado real.

import { Browser } from "puppeteer";
import { DateObject } from "../../types/basicTypes";
import { DayDataPrediction, PredictionDataSource } from "../../types/predictionTypes";

export class Cbssports implements PredictionDataSource {
  // async getData(page: any, { year, month, day }: DateObject): (Promise<DayDataPrediction>) {
  async getData(browser: Browser, { year, month, day }: DateObject): (Promise<DayDataPrediction>){
    
    const page = await browser.newPage();
    await page.goto(`https://www.cbssports.com/nba/expert-picks/${''+year+month+day}/`);

    //Wait for the results page to load and display the results.
    const GameSelector = '.picks-tbody';
    await page.waitForSelector(GameSelector);

    // Extract the results from the page. This runs in the chromium
    const gamesObject = await page.evaluate(() => {

      // Create a node list with every game of the day
      const tbodyTag = document.querySelector('.picks-tbody')
      const gamesNodeList = tbodyTag.querySelectorAll('.picks-tr')

      // Go through that list and take names and predicted scores
      const gamesList = Array.from(gamesNodeList).map(game => {

        const teamNames = game.querySelectorAll('.picks-td .game-info-team .team a');
        const homeTeamName = teamNames[1].textContent.trim()
        const awayTeamName = teamNames[0].textContent.trim()

        const overData = game.querySelector('.picks-td .expert-picks-col .expert-ou').textContent.trim();
        const spredValue = game.querySelector('.picks-td .expert-picks-col .expert-spread').textContent.trim();

        return {
          overValue: overData.replace('O','').replace('U',''),
          overConsensus: overData[0],
          spredValue: { 
            team: spredValue.split('\n')[0].trim(), 
            value: spredValue.split('\n')[1].trim() 
          },
          home: {
            name: homeTeamName,
          },
          away: {
            name: awayTeamName,
          }
        }

      })

      return gamesList


    });
    const fullDate = `${day}/${month}/${year}`

    const predictedDay = {
      date: fullDate,
      games: gamesObject
    }

    await page.close()
    return predictedDay;

  }
}