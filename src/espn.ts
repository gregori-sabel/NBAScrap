import puppeteer from 'puppeteer';
import fs from 'fs'
import { DateListGenerator } from './utils'


(async () => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  async function saveDataFromDate(link: string){
    console.log(link)
      
    await page.goto(link);

    // Wait for the results page to load and display the results.
    await page.waitForSelector('.gameModules');

    const gamesObject = await page.evaluate(() => {
      const gamesNode = document.querySelector('.gameModules')
      const gamesNodeList = gamesNode.querySelectorAll('section .Scoreboard')
      const gameObject = Array.from(gamesNodeList).map(game => {

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
      return gameObject

    })
    console.log(gamesObject)

    const date = new Date();
    const year = date.getFullYear();    
    const month = String(date.getMonth() + 1).padStart(2, '0');    
    const day = String(date.getDate()).padStart(2, '0');    
    const fullDate = [day, month, year].join('/');
    

    const dayGamesObject = {
      date: fullDate,
      games: gamesObject
    }


    fs.writeFile(
      "./src/results/"+ dayGamesObject.date.replaceAll('/','-') + '-results' + '.json', 
      JSON.stringify(dayGamesObject), 
    function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    });     
  }
  

  var dateListGenerator = new DateListGenerator();
  const dateAMDArray = dateListGenerator.getDateList('12/10/2022', '01/09/2023')
  console.log(dateAMDArray)


  await saveDataFromDate(`https://www.espn.com.br/nba/resultados/_/data/20230108`)
  await saveDataFromDate(`https://www.espn.com.br/nba/resultados/_/data/20230109`)

  // dateAMDArray.forEach(async (date) => {
  //   const formattedDate = date.replaceAll('/','')
  //   await saveDataFromDate(`https://www.espn.com.br/nba/resultados/_/data/${formattedDate}`)
  // })


  await browser.close();


})();