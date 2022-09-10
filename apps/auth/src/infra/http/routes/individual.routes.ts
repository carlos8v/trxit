import { Router } from 'express'
import { expressMiddlewareAdapter, expressRouteAdapter } from '@cube/common'

import { createIndividualController, createIndividualMiddleware } from '../controllers/createIndividual'

const individualRouter = Router()

individualRouter.post(
  '/',
  expressMiddlewareAdapter(createIndividualMiddleware),
  expressRouteAdapter(createIndividualController)
)

export default individualRouter
