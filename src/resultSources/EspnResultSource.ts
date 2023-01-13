import { DateObject } from "../types/basicTypes";
import { GameResult, ResultDataSource, DayDataResult } from "../types/resultTypes";

export class EspnResultSource implements ResultDataSource {

  getMatchDateURL(matchDate: DateObject) {
    return 'https://www.espn.com.br/nba/resultados/_/data/' +
      (matchDate.year + matchDate.month + matchDate.day)
  }

  htmlScrap() {
    const gamesNode = document.querySelector('.gameModules')
    const gamesNodeList = gamesNode.querySelectorAll('section .Scoreboard')

    const gamesObject = Array.from(gamesNodeList).map(
      (game) => {
        const awayTeamName = game.querySelectorAll('.ScoreCell__Truncate')[0].textContent.trim()
        const homeTeamName = game.querySelectorAll('.ScoreCell__Truncate')[1].textContent.trim()

        const awayTeamPoints = game.querySelectorAll('.ScoreCell__Score')[0].textContent.trim()
        const homeTeamPoints = game.querySelectorAll('.ScoreCell__Score')[1].textContent.trim()

        return {
          home: {
            name: homeTeamName,
            points: homeTeamPoints
          },
          away: {
            name: awayTeamName,
            points: awayTeamPoints
          },
        }
      }
    );

    return gamesObject
  }

  async getData(page: any, matchDate: DateObject): Promise<DayDataResult> {
    const brFormattedDate = [day, month, year].join('/')

    console.log('espn: ', brFormattedDate)

    await page.goto(this.getMatchDateURL(matchDate));

    // Wait for the results page to load and display the results.
    await page.waitForSelector('.gameModules');

    // Everthing inside evaluate happens inside the other browser
    const gamesObject: GameResult[] = await page.evaluate(this.htmlScrap)

    const dayGamesObject = {
      date: brFormattedDate,
      games: gamesObject
    }

    return dayGamesObject
  }
}