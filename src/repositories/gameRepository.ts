import { PrismaClient } from '@prisma/client'


export class GameRepository {
  private prisma = new PrismaClient();

  async createGame(homeTeamName: string, awayTeamName: string) {
    const game = await this.prisma.game.create({
      data: {
        date: new Date(),
        homeTeamName: homeTeamName,
        awayTeamName: awayTeamName,
      }
    })
    return game
  }

  async getGameByDateAndTeamNames(date: Date, homeTeamName: string, awayTeamName: string) {
    const game = await this.prisma.game.findFirst({
      where: {
        date: date,
        homeTeamName: homeTeamName,
        awayTeamName: awayTeamName,
      }
    })
    return game
  }
}