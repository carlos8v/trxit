import { Router } from 'express'

import { expressMiddlewareAdapter, expressRouteAdapter, requireAuth } from '@cube/common'

const authRouter = Router()

import { getCurrentIndividualController } from '../controllers/getCurrentIndividual'
import { signInController, signInMiddleware } from '../controllers/signIn'
import { signOutController } from '@infra/http/controllers/signOut'
import { refreshSessionController } from '../controllers/refreshSession'

authRouter.get(
  '/me',
  requireAuth('@cube/auth'),
  expressRouteAdapter(getCurrentIndividualController)
)

authRouter.post(
  '/login',
  expressMiddlewareAdapter(signInMiddleware),
  expressRouteAdapter(signInController)
)

authRouter.post(
  '/logout',
  expressRouteAdapter(signOutController)
)

authRouter.post(
  '/refresh-session',
  expressRouteAdapter(refreshSessionController)
)

export default authRouter
