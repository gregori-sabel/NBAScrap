import puppeteer from 'puppeteer';
import fs from 'fs'

import { Espn } from './espn'
import { Oddsshark } from './oddsshark'
import { getDateList } from './utils/GetDateList'

export interface DateObject {
  day: string,
  month: string,
  year: string
}

export interface jsonData {
  date: string,
  games: []
}


(async () => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const date = new Date('01/10/2023'); // mes dia ano - palhaçada mas é assim
  const year = date.getFullYear()+'';    
  const month = String(date.getMonth() + 1).padStart(2, '0');    
  const day = String(date.getDate()).padStart(2, '0');    

  const dateAMDArray = getDateList('12/10/2022', '12/10/2022')
  console.log(dateAMDArray)


  async function getResults() {
    const espn = new Espn();  
    const gamesData = await espn.getData(page, {day, month, year})
    console.log(gamesData)
    
    fs.writeFile(
      "./src/temp/results/"+ gamesData.date.replaceAll('/','-') + '-results' + '.json', 
      JSON.stringify(gamesData), 
    function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    });  
  }


  async function getPredicts() {
    const oddsshark = new Oddsshark();  
    const gamesData = await oddsshark.getData(page, {day, month, year})
    console.log(gamesData)

      fs.writeFile(
        "./src/temp/predictions/"+ gamesData.date.replaceAll('/','-') + '.json', 
        JSON.stringify(gamesData), 
      function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
      }); 
  }

  await getResults()
  await getPredicts()

  await browser.close();
})();