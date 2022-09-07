import { Express } from 'express'

import authRouter from './auth.routes'
import individualRouter from './individual.routes'

export const setupRoutes = (app: Express) => {
  app.use('/', authRouter)
  app.use('/individual', individualRouter)
}
