import puppeteer from 'puppeteer';
import fs from 'fs'


(async () => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.espn.com.br/nba/resultados/_/data/20230108');

  //*[@id="__next"]/div/main/div/div[2]/div[2]/div/div[2]/div/div/div/div[2]

  // Wait for the results page to load and display the results.
  await page.waitForSelector('.gameModules');

  const gamesObject = await page.evaluate(() => {
    const gamesNode = document.querySelector('.gameModules')

    const gamesNodeList = gamesNode.querySelectorAll('section .Scoreboard')
    const xxx = [...gamesNodeList].map(game => {

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
    return xxx

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


  await browser.close();


})();