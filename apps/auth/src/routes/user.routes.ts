import { Router } from 'express'
import { expressRouteAdapter } from '@cube/common'

import createUserController from '../useCases/createUser'
import getCurrentUserController from '../useCases/getCurrentUser'

import createUserValidator from '../middlewares/createUserValidator'
import authMiddleware from '../middlewares/authMiddleware'

const userRouter = Router()

userRouter.post('/', createUserValidator, expressRouteAdapter(createUserController))
userRouter.get('/me', authMiddleware, expressRouteAdapter(getCurrentUserController))

export default userRouter
