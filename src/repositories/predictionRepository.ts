import { Prisma, PrismaClient } from '@prisma/client'
import { string } from 'yargs';
import { DateObject } from '../types/basicTypes';
import { GamePrediction } from '../types/predictionTypes';
import { GameResult } from '../types/resultTypes';


export class PredictionRepository {
  private prisma = new PrismaClient();

  async createPrediction(prediction: GamePrediction) {

    try{
      await this.prisma.prediction.create({
        data: {
          siteName: 'siteteste no repositorio',
          homeTeamScore: prediction.home.score,
          awayTeamScore: prediction.away.score,
          overValue: prediction.overValue,
          overConsensus: prediction.overConsensus,
          spreadConcensus: prediction.spredValue.team,
          spreadValue: +prediction.spredValue.value,
  
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
    } catch (e) {
      console.log(e)
      throw e
    }

    
  }

  // async getPredictionBySiteAndDate(homeTeamName: string, awayTeamName: string, date: DateObject, siteName: string){

  //   const response = await this.prisma.prediction.findFirst({
  //     include:{
  //       GameId: {
  //         select: {
  //           id: true
  //         }
  //       }
  //     },
  //     where: {
  //       AND: [
  //         {
  //           siteName: siteName,
  //         },
  //         {
  //           GameId: {
  //             homeTeamName: {
  //               contains: homeTeamName
  //             },
  //             awayTeamName: {
  //               contains: awayTeamName
  //             },
  //             date: date.year + '-' + date.month + '-' + date.day,
  //           }
  //         }
  //       ]        
  //     }
  //   })

  //   return response
  // }


}