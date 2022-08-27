import { resolve } from 'path'

import express from 'express'
import cookie from 'cookie-session'
import cors from 'cors'

import { setupRoutes } from './routes'

export const app = express()

app.set('views', resolve(__dirname, '../../static/views'))
app.set('view engine', 'ejs')

app.set('trust proxy', true)
app.use(cookie({
  signed: false,
  maxAge: 1000 * 60 * 10
}))

app.use(cors({
  origin: '*'
}))

app.use(express.urlencoded({ extended: false }))

setupRoutes(app)
