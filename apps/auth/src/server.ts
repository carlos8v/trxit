import 'dotenv/config'
import { app } from './app'

app.listen(process.env.PORT, () => {
  console.log(`[@bank/auth]: service started at port ${process.env.PORT}`)
})
