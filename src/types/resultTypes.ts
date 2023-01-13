import { DateObject } from "./basicTypes"

export interface GameResult {
  home: {
    name: string,
    points: string
  },
  away: {
    name: string,
    points: boolean
  },
}

export interface DayDataResult {
  date: string;
  games: GameResult[];
}

export interface ResultsDataSource {
  getData(
    page: any,
    { year, month, day }: DateObject
  ): Promise<DayDataResult>
}
