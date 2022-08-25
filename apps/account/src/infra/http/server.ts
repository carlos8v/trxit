import 'dotenv/config'
import { app } from './app'
import { connectMessaging } from '../messaging'

async function start() {
  await connectMessaging()

  app.listen(process.env.PORT, () => {
    console.log(`[@cube/account]: Service started at port ${process.env.PORT}`)
  })
}

start()
