

interface dateObject {
  day: string,
  month: string,
  year: string
}

export class Oddsshark {
  async getData(page: any, {year, month, day}: dateObject) {  
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
        
        return {
          overValue: overValue,
          overConsensus: overValueConsensus.replace('%',''),
          home: {
            name: teamNames[1].trim(),
            score: homeScore,
            spread: homeSpread,
            spreadConsensus: homeSpreadConsensus.replace('%','')
          },
          away: {
            name: teamNames[0].trim(),
            score: awayScore,
            spread: awaySpread,
            spreadConsensus: ( 100 - +homeSpreadConsensus.replace('%','') ) + ''
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

    return gamesObject;
    
  
  }
}

// (async () => {

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://www.oddsshark.com/nba/computer-picks');

//   // Wait for the results page to load and display the results.
//   const GameSelector = '.picks-table-wrap';
//   await page.waitForSelector(GameSelector);

//     // Extract the results from the page. This runs in the chromium
//   const gamesObject = await page.evaluate(() => {
//     const GameSelector = '.picks-table-wrap';
//     // Create a node list with every game of the day
//     const gamesNodeList = document.querySelectorAll(GameSelector)

//     // Go through that list and take names and predicted scores
//     const gamesList = Array.from(gamesNodeList).map(game => {
//       const teamNamesByGameSelector = '.pick-mobile-header--teams'

//       const teamNames = game.querySelector(teamNamesByGameSelector).textContent.split('/');
      
//       const awayScore = game.querySelector('.pick-predicted-score-away .text-right').textContent.trim();
//       const homeScore = game.querySelector('.pick-predicted-score-home .text-right').textContent.trim();
      
//       const awaySpread = game.querySelector('.pick-computer-pick-spread-away .text-right').textContent.trim();
//       const homeSpread = game.querySelector('.pick-computer-pick-spread-home .text-right').textContent.trim();
      
//       const overValue = game.querySelector('.pick-computer-pick-under .text-right').textContent.trim();
//       const overValueConsensus = game.querySelector('.pick-consensus-spread-away .text-right').textContent.trim();
      
//       const homeSpreadConsensus = game.querySelector('.pick-consensus-spread-away .text-right').textContent.trim();
      
//       return {
//         overValue: overValue,
//         overConsensus: overValueConsensus.replace('%',''),
//         home: {
//           name: teamNames[1].trim(),
//           score: homeScore,
//           spread: homeSpread,
//           spreadConsensus: homeSpreadConsensus.replace('%','')
//         },
//         away: {
//           name: teamNames[0].trim(),
//           score: awayScore,
//           spread: awaySpread,
//           spreadConsensus: ( 100 - +homeSpreadConsensus.replace('%','') ) + ''
//         }
//       }

//     })

//     const date = new Date();
//     const year = date.getFullYear();    
//     const month = String(date.getMonth() + 1).padStart(2, '0');    
//     const day = String(date.getDate()).padStart(2, '0');    
//     const fullDate = [day, month, year].join('/');
    
//     const predictedDay = { 
//       date: fullDate,
//       games: gamesList
//     }

//     return predictedDay

//   });
  
//   console.log(gamesObject.games)

//   fs.writeFile(
//     "./src/predictions/"+ gamesObject.date.replaceAll('/','-') + '.json', 
//     JSON.stringify(gamesObject), 
//   function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
//   }); 

//   await browser.close();
// })();

