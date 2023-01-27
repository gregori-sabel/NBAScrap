import { PrismaClient } from '@prisma/client'
import { string } from 'yargs';
import { GamePrediction } from '../types/predictionTypes';
import { GameResult } from '../types/resultTypes';


export class PredictionRepository {
  private prisma = new PrismaClient();

  async createPrediction(prediction: GamePrediction) {

    await this.prisma.prediction.create({
      data: {
        siteName: 'siteteste no repositorio',
        homeTeamScore: prediction.home.score,
        awayTeamScore: prediction.away.score,
        overValue: prediction.overValue,
        overConsensus: prediction.overConsensus,
        spreadConcensus: +prediction.spredValue,
        spreadValue: +prediction.spredValue,

        GameId: {
          connectOrCreate: {
            where: {
              date_homeTeamName_awayTeamName: {
                date: new Date(),
                homeTeamName: prediction.home.name,
                awayTeamName: prediction.away.name, 
              }
            },
            create: {
              date: new Date(),
              homeTeamName: prediction.home.name,
              awayTeamName: prediction.away.name, 
            }
          }
        }
      },
    })
  }


}