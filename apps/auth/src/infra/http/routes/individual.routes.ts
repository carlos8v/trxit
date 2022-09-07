import { Router } from 'express'
import { expressRouteAdapter } from '@cube/common'

import createIndividualController from '@application/useCases/createIndividual'
import createIndividualMiddleware from '../middlewares/createIndividualMiddleware'

const individualRouter = Router()

individualRouter.post('/', createIndividualMiddleware, expressRouteAdapter(createIndividualController))

export default individualRouter
