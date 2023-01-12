import { DayDataPrediction } from ".."
import { DateObject } from "./basicTypes"



export interface GamePrediction {
  overValue: string,
  overConsensus: string,
  home: {
    name: string,
    score: string,
    spread: string,
    spreadConsensus: string,
  },
  away: {
    name: string,
    score: string,
    spread: string,
    spreadConsensus: string,
  }
}


export interface PredictionDataSource{
    getData(
        page: any, 
        {year, month, day}: DateObject
    ): Promise<DayDataPrediction>
  }