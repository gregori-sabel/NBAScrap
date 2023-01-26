import { PrismaClient } from '@prisma/client'
import { string } from 'yargs';
import { GamePrediction } from '../types/predictionTypes';
import { GameResult } from '../types/resultTypes';


export class PredictionRepository {
  private prisma = new PrismaClient();

  async createPrediction(prediction: GamePrediction, gameId: number) {
    await this.prisma.prediction.create({
      data: {
        gameId: gameId,
        siteName: 'siteteste no repositorio',
        homeTeamScore: prediction.home.score,
        awayTeamScore: prediction.away.score,
        overValue: prediction.overValue,
        overConsensus: prediction.overConsensus,
        spreadConcensus: prediction.spredValue,
        spreadValue: prediction.spredValue
      }
    })
  }


}