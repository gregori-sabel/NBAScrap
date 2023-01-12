import { DateObject } from ".."

export interface GameResultsJSON {
  home: {
    name: string,
    points: string
  }, 
  away: {
    name: string,
    points: boolean
  },
}[]

export interface ResultsDataSource {
  getData(
    page: Promise<any>,
    {year, month, day}: DateObject
  ): GameResultsJSON
}