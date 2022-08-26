import 'dotenv/config'
import { app } from './app'

import { connectMessageBroker, disconnectMessageBroker } from '../messaging'

const gracefulShutdown = async (e: any) => {
  console.error(e)
  await disconnectMessageBroker()
  process.exit(0)
}

async function start() {
  await connectMessageBroker()

  app.listen(process.env.PORT, () => {
    console.log(`[@cube/account]: Service started at port ${process.env.PORT}`)
  })

  const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']
  signalTraps.forEach((type) => process.on(type, gracefulShutdown))
}

start()
