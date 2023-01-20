# NBAScrap

Gets results from NBA matches

## Running the project
```bash
npm run dev
```

- If an error occurs because of typescript, try running:

```bash
npm install --save-dev ts-node typescript
```

### Running Migrations

- Create a .env file with a DATABASE_URL constraint 
Ex: DATABASE_URL="postgresql://{username}:{password}@{host}:{port}/{tablename}"

- Run migrations ( the example below is possibly incorrect. Zap-me)

```bash
npx prisma reset
```

- Seed the database with fake data

```bash
npx prisma db seed
```

### Running Tests
```bash
npm run test
```

or, to run tests continually:

```bash
npm run watchtest
```