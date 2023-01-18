import msql from 'mysql'





(async () => {

  console.log('Tentando conectar no banco')

  const db = await msql.createConnection({
    host: 'database-1.cviwnkmv3xky.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'bananinha1234',
    database: 'Nbascrap'
  })

  await db.connect((err) => {
    if(err){
      console.log(err.message);
      return;
    }
    console.log('Database connected!')
  })


  async function doSQL(sql: string ) {
    db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result)
    })
  }

  // await doSQL('create database Nbascrap')
  // await doSQL(`
  //   create table games(
  //     homeTeamName VARCHAR(50),
  //     awayTeamName VARCHAR(50),
  //     homeTeamPoints INT,
  //     awayTeamPoints INT,
  //     date DATE
  //   )
  // `)
  await doSQL('insert into games (homeTeamName, awayTeamName, homeTeamPoints, awayTeamPoints, date) VALUES ("time1", "time2", 12, 34, "13/05/2002")')
  

  db.end()

  
  console.log('Fim.')
})()
