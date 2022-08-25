import { Router } from 'express'
import { expressRouteAdapter } from '@cube/common'

import signInController from '@application/useCases/signIn'
import signOutController from '@application/useCases/signOut'
import createIndividualController from '@application/useCases/createIndividual'
import getCurrentIndividualController from '@application/useCases/getCurrentIndividual'

import createIndividualMiddleware from '../middlewares/createIndividualMiddleware'
import signInIndividualMiddleware from '../middlewares/signInIndividualMiddleware'
import authMiddleware from '../middlewares/authMiddleware'

const individualRouter = Router()

individualRouter.post('/', createIndividualMiddleware, expressRouteAdapter(createIndividualController))
individualRouter.get('/me', authMiddleware, expressRouteAdapter(getCurrentIndividualController))
individualRouter.post('/login', signInIndividualMiddleware, expressRouteAdapter(signInController))
individualRouter.post('/logout', expressRouteAdapter(signOutController))

export default individualRouter
