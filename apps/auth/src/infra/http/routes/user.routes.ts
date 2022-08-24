import { Router } from 'express'
import { expressRouteAdapter } from '@cube/common'

import signInController from '@application/useCases/signIn'
import createUserController from '@application/useCases/createUser'
import getCurrentUserController from '@application/useCases/getCurrentUser'

import createUserMiddleware from '../middlewares/createUserMiddleware'
import signInUserMiddleware from '../middlewares/signInUserMiddleware'
import authMiddleware from '../middlewares/authMiddleware'

const userRouter = Router()

userRouter.post('/', createUserMiddleware, expressRouteAdapter(createUserController))

userRouter.post('/login', signInUserMiddleware, expressRouteAdapter(signInController))

userRouter.get('/me', authMiddleware, expressRouteAdapter(getCurrentUserController))

export default userRouter
