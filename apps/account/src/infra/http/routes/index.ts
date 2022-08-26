import { Express } from 'express'

import accountRouter from './account.routes'

export const setupRoutes = (app: Express) => {
  app.use('/', accountRouter)
}
