import { GameRepository } from "../repositories/GameRepository";
import { PredictionRepository } from "../repositories/predictionRepository";
import { ResultRepository } from "../repositories/resultRepository"
import { GamePrediction } from "../types/predictionTypes";
import { GameResult } from "../types/resultTypes";

export class PredictionUseCases { 
  async savePrediction(prediction: GamePrediction) {
    const predictionRepository = new PredictionRepository();
    const gameRepository = new GameRepository();
  
    const savedGame = await gameRepository.getGameByDateAndTeamNames(new Date(), prediction.home.name, prediction.away.name)
    
    if(savedGame){
      await predictionRepository.createPrediction(prediction, savedGame.id)
    }else{
      // caso não tenha registro de resultado no banco ainda, cria
      const game = await gameRepository.createGame(prediction.home.name, prediction.away.name)
      await predictionRepository.createPrediction(prediction, game.id)
    }
  } 
}
