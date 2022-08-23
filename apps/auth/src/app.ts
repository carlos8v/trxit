import express from 'express'

import { setupRoutes } from './routes'

export const app = express()

app.set('trust proxy', true)

app.use(express.json())

setupRoutes(app)
