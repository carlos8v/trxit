import express from 'express'
import cookie from 'cookie-session'

import { requireAuth } from '@cube/common'

import { setupRoutes } from './routes'

export const app = express()

app.set("trust proxy", true)
app.use(cookie({
  signed: false,
  maxAge: 1000 * 60 * 10
}))

app.use(express.json())

app.use(requireAuth)

setupRoutes(app)
