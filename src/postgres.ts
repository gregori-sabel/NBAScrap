import postgres from 'pg'





(async () => {

  console.log('Tentando conectar no banco')

  const db = new postgres.Client({
    host: 'db-postgres.cviwnkmv3xky.us-east-1.rds.amazonaws.com',
    port: 5432,
    user: 'admin1',
    password: 'bananinha1234',
    database: 'nba'
  })

  try{
    await db.connect()
    console.log('conectou')
  }catch(err) {
    console.log(err)
  }

  async function doSQL(sql: string ) {
    try{
      const sqlResponse = await db.query(sql)
      console.log(sqlResponse)
    }catch(err){
      console.log(err)
    }
  }
  
  await doSQL(`
    create table games(
      homeTeamName VARCHAR(50),
      awayTeamName VARCHAR(50),
      homeTeamPoints INT,
      awayTeamPoints INT,
      date DATE
    )
  `)
  

  db.end()

  
  console.log('Fim.')
})()
