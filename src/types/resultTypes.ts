import { Browser } from "puppeteer";
import { DateObject } from "./basicTypes"


export interface GameResult { 
  home: { 
    name: string; 
    points: string; 
  }; 
  away: { 
    name: string; 
    points: string; 
  }; 
}

export interface DayDataResult {
  date: string;
  games: GameResult[];
}

export interface ResultDataSource {
  getData(browser: Browser, { day, month, year }: DateObject): Promise<DayDataResult>
}
