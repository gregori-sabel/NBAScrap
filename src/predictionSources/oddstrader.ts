// https://www.oddstrader.com/nba/picks/?date=20230105

// esse site conseguimos pegar pela data ali oh, os resultados do passado.
// esse CONSENSUS é legal da gnt pegar tb

import { Browser } from "puppeteer";
import { DateObject } from "../types/basicTypes";
import { DayDataPrediction, PredictionDataSource } from "../types/predictionTypes";

export class Oddstrader implements PredictionDataSource {
  async getData(browser: Browser, { year, month, day }: DateObject): (Promise<DayDataPrediction>) {

    const page = await browser.newPage();
    await page.goto(`https://www.oddstrader.com/nba/picks/?date=${''+year+month+day}`);

    // Wait for the results page to load and display the results.
    await page.waitForSelector('.picksCard');

    // Extract the results from the page. This runs in the chromium
    const gamesObject = await page.evaluate(() => {

      // Create a node list with every game of the day
      const gamesNodeList = document.querySelectorAll('.picksCard')

      // Go through that list and take names and predicted scores
      const gamesList = Array.from(gamesNodeList).map(game => {

        const teamNames = game.querySelectorAll('.nameAndRanking');
        const homeTeamName = teamNames[1].textContent.trim()
        const awayTeamName = teamNames[0].textContent.trim()

        const teamScores = game.querySelectorAll('.score');
        const homeTeamScore = teamScores[1].textContent.trim()
        const awayTeamScore = teamScores[0].textContent.trim()

        const secondDiv = game.querySelectorAll('.picksCard div')[2].textContent
        // const extraInfo = secondDiv.querySelector('span').textContent.trim()

        // const awayScore = game.querySelector('.pick-predicted-score-away .text-right').textContent.trim();
        // const homeScore = game.querySelector('.pick-predicted-score-home .text-right').textContent.trim();

        // const awaySpread = game.querySelector('.pick-computer-pick-spread-away .text-right').textContent.trim();
        // const homeSpread = game.querySelector('.pick-computer-pick-spread-home .text-right').textContent.trim();

        // const overValue = game.querySelector('.pick-computer-pick-under .text-right').textContent.trim();
        // const overValueConsensus = game.querySelector('.pick-consensus-spread-away .text-right').textContent.trim();

        // const homeSpreadConsensus = game.querySelector('.pick-consensus-spread-away .text-right').textContent.trim();

        return {
          overValue: secondDiv,
          // overConsensus: overValueConsensus.replace('%', ''),
          home: {
            name: homeTeamName,
            score: homeTeamScore,
            // spread: homeSpread,
            // spreadConsensus: homeSpreadConsensus.replace('%', '')
          },
          away: {
            name: awayTeamName,
            score: awayTeamScore,
            // spread: awaySpread,
            // spreadConsensus: (100 - +homeSpreadConsensus.replace('%', '')) + ''
          }
        }

      })

      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const fullDate = [day, month, year].join('/');

      const predictedDay = {
        date: fullDate,
        games: gamesList
      }

      return predictedDay

    });
    console.log(gamesObject)

    await page.close()
    return gamesObject;


  }
}