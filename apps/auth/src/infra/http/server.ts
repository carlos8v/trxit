import 'dotenv/config'
import { app } from './app'

import { initializeDatabaseConnection } from '@typeorm/adapters/dataSource'

async function start() {
  await initializeDatabaseConnection()

  app.listen(process.env.PORT, () => {
    console.log(`[@cube/auth]: Service started at port ${process.env.PORT}`)
  })
}

start()
