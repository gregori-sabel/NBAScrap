import { ResultRepository } from "../repositories/ResultRepository"
import { GameResult } from "../types/resultTypes";

export class ResultUseCases { 
  async saveResult(result: GameResult) {
    const resultRepository = new ResultRepository();
  
    const savedResult = await resultRepository.getResultByDate(new Date())
    
    if(savedResult){
      //caso esteja salvo um valor vazio, adicionar valor
      if(savedResult.homeTeamScore === 0){
        // atualizar valor do banco
        // resultRepository.updateResult(result)
      }else{
        // caso ja tenha salvo o valor final, não salvar mais
        return
      }
    }else{
      // caso não tenha registro de resultado no banco ainda, cria
      resultRepository.createResult(result)
    }
  } 
}
