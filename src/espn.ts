import { DateObject } from "."
import { GameResultsJSON } from "./types/resultTypes";

export class Espn {

  async getData(page: any, {year, month, day}: DateObject) {  
    const brFormattedDate = [day, month, year].join('/')

    console.log('espn: ', brFormattedDate)
    console.log('https://www.espn.com.br/nba/resultados/_/data/'+ ( year+month+day ))
      
    await page.goto('https://www.espn.com.br/nba/resultados/_/data/'+ ( year+month+day ));

    // Wait for the results page to load and display the results.
    await page.waitForSelector('.gameModules');

    const gamesObject: GameResultsJSON = await page.evaluate(() => {
      const gamesNode = document.querySelector('.gameModules')
      const gamesNodeList = gamesNode.querySelectorAll('section .Scoreboard')

      const gamesObject = Array.from(gamesNodeList).map(game => {

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
      })
      return gamesObject

    })   

    const dayGamesObject = {
      date: brFormattedDate,
      games: gamesObject
    }
    
    return dayGamesObject  

  }
}
