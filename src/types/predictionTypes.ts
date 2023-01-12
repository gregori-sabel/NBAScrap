import { DateObject, jsonData } from ".."

export interface GamePredictionsJSON {
  prediction : string
}

export interface PredictionDataSource{
    getData(
        page: any, 
        {year, month, day}: DateObject
    ): Promise<jsonData>
  }