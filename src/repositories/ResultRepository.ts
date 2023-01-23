import { PrismaClient } from '@prisma/client'
import { string } from 'yargs';
import { GameResult } from '../types/resultTypes';


export class ResultRepository {
  private prisma = new PrismaClient();

  async createResult(result: GameResult, gameId: number) {
    await this.prisma.result.create({
      data: {
        gameId: gameId,
        homeTeamScore: +result.home.points,
        awayTeamScore: +result.away.points,
      }
    })
  }


}