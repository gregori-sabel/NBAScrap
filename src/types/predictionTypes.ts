import { Browser } from "puppeteer";
import { DateObject } from "./basicTypes"

export interface GamePrediction {
  overValue: string,
  overConsensus?: string,
  spredValue?: { 
    team?: string,
    value?: string,
  },
  home: {
    name: string,
    score?: string,
    spread?: string,
    spreadConsensus?: string,
  },
  away: {
    name: string,
    score?: string,
    spread?: string,
    spreadConsensus?: string,
  }
}

export interface DayDataPrediction {
  date: string;
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