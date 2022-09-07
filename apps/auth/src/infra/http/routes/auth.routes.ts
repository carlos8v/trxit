import { Router } from 'express'
import { expressRouteAdapter, requireAuth } from '@cube/common'

const authRouter = Router()

import getCurrentIndividualController from '@application/useCases/getCurrentIndividual'

import signInController from '@application/useCases/signIn'
import signInIndividualMiddleware from '../middlewares/signInIndividualMiddleware'

import signOutController from '@application/useCases/signOut'

import { refreshSessionController } from '@application/useCases/refreshSession'

authRouter.get('/me', requireAuth, expressRouteAdapter(getCurrentIndividualController))
authRouter.post('/login', signInIndividualMiddleware, expressRouteAdapter(signInController))
authRouter.post('/logout', expressRouteAdapter(signOutController))
authRouter.post('/refresh-session', expressRouteAdapter(refreshSessionController))

export default authRouter
