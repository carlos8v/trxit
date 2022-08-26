import 'dotenv/config'
import { app } from './app'

import { Server } from 'http'

import { initializeDatabaseConnection, destroyDatabaseConnection } from '@typeorm/adapters/dataSource'
import { connectMessageBroker, disconnectMessageBroker } from '../messaging'

let server: Server

const gracefulShutdown = async (e: any) => {
  console.error(e)

  await destroyDatabaseConnection()
  await disconnectMessageBroker()
  server?.close()

  process.exit(0)
}

async function start() {
  await initializeDatabaseConnection()
  await connectMessageBroker()

  server = app.listen(process.env.PORT, () => {
    console.log(`[@cube/auth]: Service started at port ${process.env.PORT}`)
  })

  const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']
  signalTraps.forEach((type) => process.on(type, gracefulShutdown))
}

start()
