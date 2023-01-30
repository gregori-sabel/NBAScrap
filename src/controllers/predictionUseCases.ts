import { GameRepository } from "../repositories/GameRepository";
import { PredictionRepository } from "../repositories/predictionRepository";
import { ResultRepository } from "../repositories/resultRepository"
import { DateObject } from "../types/basicTypes";
import { DayDataPrediction, GamePrediction } from "../types/predictionTypes";
import { GameResult } from "../types/resultTypes";

export class PredictionUseCases { 
  async savePrediction( date: DateObject, game: GamePrediction, siteName: string ) {
    const predictionRepository = new PredictionRepository();
  
    await predictionRepository.createPrediction(game)
  } 

  async saveMultiplePredictions( date: DateObject, dayDataPrediction: DayDataPrediction, siteName: string ) {

    // sepah tem que dar um promise resolve all e essas parada
    dayDataPrediction.games.map( async (game) => {
      await this.savePrediction( date, game, siteName )
    })

  } 
}
