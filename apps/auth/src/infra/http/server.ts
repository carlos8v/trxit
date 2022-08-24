import 'dotenv/config'
import { app } from './app'

app.listen(process.env.PORT, () => {
  console.log(`[@cube/auth]: Service started at port ${process.env.PORT}`)
})
