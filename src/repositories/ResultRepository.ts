import { PrismaClient } from '@prisma/client'
import { GameResult } from '../types/resultTypes';


export class ResultRepository {
  private prisma = new PrismaClient();

  async createResult(result: GameResult) {
    await this.prisma.result.create({
      data: {
        homeTeamName: result.home.name,
        awayTeamName: result.away.name,
        // homeTeamScore: result.home.points,
        // awayTeamScore: result.away.points,
        homeTeamScore: 1,
        awayTeamScore: 2,
      }
    })
  }
}