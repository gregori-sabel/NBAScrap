import { GameRepository } from "../repositories/GameRepository";
import { ResultRepository } from "../repositories/resultRepository"
import { GameResult } from "../types/resultTypes";

export class ResultUseCases { 
  async saveResult(result: GameResult) {
    const resultRepository = new ResultRepository();
    const gameRepository = new GameRepository();
  
    const savedGame = await gameRepository.getGameByDateAndTeamNames(new Date(), result.home.name, result.away.name)
    
    if(savedGame){
      await resultRepository.createResult(result, savedGame.id)
    }else{
      // caso não tenha registro de resultado no banco ainda, cria
      const game = await gameRepository.createGame(result.home.name, result.away.name)
      await resultRepository.createResult(result, game.id)
    }
  } 
}
