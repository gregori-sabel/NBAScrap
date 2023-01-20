import { PrismaClient } from '@prisma/client'
import { GameResult } from '../types/resultTypes';


export class ResultRepository {
  private prisma = new PrismaClient();

  async createResult(result: GameResult) {
    await this.prisma.result.create({
      data: {
        date: new Date(),
        homeTeamName: result.home.name,
        awayTeamName: result.away.name,
        homeTeamScore: +result.home.points,
        awayTeamScore: +result.away.points,
      }
    })
  }

  async getResultByDate(date: Date) {
    const result = await this.prisma.result.findFirst({
      where: {
        date: date
      }
    })
    return result
  }
}