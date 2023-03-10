import { Browser } from "puppeteer";
import { DateObject } from "../../types/basicTypes";
import { DayDataPrediction, GamePrediction, PredictionDataSource } from "../../types/predictionTypes";

export class Oddsshark implements PredictionDataSource {
  async getData(browser: Browser, { year, month, day }: DateObject): (Promise<DayDataPrediction>) {
    
    const page = await browser.newPage();
    await page.goto('https://www.oddsshark.com/nba/computer-picks');

    // Wait for the results page to load and display the results.
    const GameSelector = '.picks-table-wrap';
    await page.waitForSelector(GameSelector);

    // Extract the results from the page. This runs in the chromium
    const gamesObject = await page.evaluate(() => {
      const GameSelector = '.picks-table-wrap';
      // Create a node list with every game of the day
      const gamesNodeList = document.querySelectorAll(GameSelector)

      // Go through that list and take names and predicted scores
      const gamesList = Array.from(gamesNodeList).map(game => {
        const teamNamesByGameSelector = '.pick-mobile-header--teams'

        const teamNames = game.querySelector(teamNamesByGameSelector).textContent.split('/');

        const awayScore = game.querySelector('.pick-predicted-score-away .text-right').textContent.trim();
        const homeScore = game.querySelector('.pick-predicted-score-home .text-right').textContent.trim();

        const awaySpread = game.querySelector('.pick-computer-pick-spread-away .text-right').textContent.trim();
        const homeSpread = game.querySelector('.pick-computer-pick-spread-home .text-right').textContent.trim();

        const overValue = game.querySelector('.pick-computer-pick-under .text-right').textContent.trim();
        const overValueConsensus = game.querySelector('.pick-consensus-spread-away .text-right').textContent.trim();

        const homeSpreadConsensus = game.querySelector('.pick-consensus-spread-away .text-right').textContent.trim();

        const gameObject: GamePrediction = {
          overValue: +overValue,
          overConsensus: overValueConsensus.replace('%', ''),
          spredValue: {
            team: +homeSpread > 0 ? 'home' : 'away',
            value: +homeSpread > 0 ? +homeSpread : +awaySpread,
          },
          home: {
            name: teamNames[1].trim(),
            score: +homeScore,
            spread: +homeSpread,
            spreadConsensus: +homeSpreadConsensus.replace('%', '')
          },
          away: {
            name: teamNames[0].trim(),
            score: +awayScore,
            spread: +awaySpread,
            spreadConsensus: +(100 - +homeSpreadConsensus.replace('%', ''))
          }
        }

        return gameObject

      })

      return gamesList

    });

    const fullDate = `${day}/${month}/${year}`

    const predictedDay: DayDataPrediction = {
      siteName: "oddsshark",
      date: fullDate,
      games: gamesObject
    }

    await page.close()
    return predictedDay;


  }
}