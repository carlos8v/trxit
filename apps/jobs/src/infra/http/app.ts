import { resolve } from 'path'

import express from 'express'
import cookie from 'cookie-session'

import { setupRoutes } from './routes'

export const app = express()

app.set('views', resolve(__dirname, '../../static/views'))
app.set('view engine', 'ejs')

app.set('trust proxy', true)
app.use(cookie({
  name: 'admin_session',
  signed: false,
  maxAge: 1000 * 60 * 10
}))

app.use(express.urlencoded({ extended: false }))

setupRoutes(app)
