import { Express } from 'express'

import individualRouter from './individual.routes'

export const setupRoutes = (app: Express) => {
  app.use('/individual', individualRouter)
}
