// https://www.oddstrader.com/nba/picks/?date=20230105

// esse site conseguimos pegar pela data ali oh, os resultados do passado.
// esse CONSENSUS é legal da gnt pegar tb

import { Browser } from "puppeteer";
import { DateObject } from "../../types/basicTypes";
import { DayDataPrediction, PredictionDataSource } from "../../types/predictionTypes";

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

        const secondDiv = game.querySelectorAll('.picksCard > div')[1]
        const secondDivText = secondDiv.textContent.trim()
        const homeSpread = secondDivText.split('Spread ')[1].split(' and')[0]
        const awaySpread = (homeSpread[0] === '+' ? '-' : '+') + homeSpread.slice(1)
        const homeSpreadConsensus = secondDivText.split(' cover ')[0].trim().split(' ').pop()
        const overText = secondDivText.split('will go ')[1]
        const overConsensus = overText.split(' ')[0]
        const overValue = overText.split(' ')[1]

        return {
          overValue: overValue,
          overConsensus: overConsensus,
          home: {
            name: homeTeamName,
            score: homeTeamScore,
            spread: homeSpread,
            spreadConsensus: homeSpreadConsensus === 'not' ? 'not cover' : 'cover'
          },
          away: {
            name: awayTeamName,
            score: awayTeamScore,
            spread: awaySpread,
            spreadConsensus: homeSpreadConsensus === 'not' ? 'cover' : 'not cover'
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

    console.log(predictedDay)

    await page.close()
    return predictedDay;


  }
}