import { PrismaClient } from "@prisma/client";
import { mainModule } from "process";
const prisma = new PrismaClient()

async function main() {

  const game = await prisma.game.create({
    data: {
      id: 1,
      date: new Date(),
      homeTeamName: 'time1',
      awayTeamName: 'time2',

    }
  })

  const predictions = await prisma.prediction.createMany({
    data: [
          {
            gameId: game.id, // da pra fazer assim
            siteName: 'greg.com.br',
            homeTeamScore: 231,
            awayTeamScore: 432,          
          },
          {
            gameId: 1,
            siteName: 'bemesko.com.br',
            homeTeamScore: 213,
            awayTeamScore: 211,          
          },
          {
            gameId: 1,
            siteName: 'pires.outlook.br',
            homeTeamScore: 221,
            awayTeamScore: 261,          
          },
          {
            gameId: 1,
            siteName: 'horse.com.com.com',
            homeTeamScore: 272,
            awayTeamScore: 199,          
          },
        ]
  })

  const result = await prisma.result.create({
    data: {
      id: 1,
      gameId: 1,
      homeTeamScore: 135,
      awayTeamScore: 123,

    }
  })
  
  console.log(game, predictions, result)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
