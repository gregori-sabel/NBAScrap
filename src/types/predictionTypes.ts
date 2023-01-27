import { Browser } from "puppeteer";
import { DateObject } from "./basicTypes"

export interface GamePrediction {
  overValue: number,
  overConsensus?: string,
  spredValue?: { 
    team?: string,
    value?: number,
  },
  home: {
    name: string,
    score?: number,
    spread?: number,
    spreadConsensus?:  number | string,
  },
  away: {
    name: string,
    score?: number,
    spread?:  number,
    spreadConsensus?: number | string,
  }
}

export interface DayDataPrediction {
  date: string;
  siteName: 'cbssports' | 'oddsshark' | 'oddstrader';
  games: GamePrediction[];
}

export interface PredictionDataSource {
  getData(
    page: Browser,
    { year, month, day }: DateObject
  ): Promise<DayDataPrediction>
}

// export interface IPredictionRepository {

// }