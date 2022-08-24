import { Router } from 'express'
import { expressRouteAdapter } from '@cube/common'

import createUser from '../useCases/createUser'

import createUserValidator from '../middlewares/createUserValidator'

const userRouter = Router()

userRouter.post('/', createUserValidator, expressRouteAdapter(createUser))

export default userRouter
