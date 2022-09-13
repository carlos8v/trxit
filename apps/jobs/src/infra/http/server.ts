import 'dotenv/config'
import { app } from './app'
import { disconnect } from '../messaging'

let server = app.listen(process.env.PORT, () => {
  console.log(`[@trxit/jobs]: Service started at port ${process.env.PORT}`)
})

const gracefulShutdown = async (e: any) => {
  console.error(e)
  await disconnect()
  server?.close()
  process.exit(0)
}

const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']
signalTraps.forEach((type) => process.on(type, gracefulShutdown))
