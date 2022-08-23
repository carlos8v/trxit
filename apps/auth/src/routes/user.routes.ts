import { Router } from 'express'

import createUser from '../useCases/createUser'

import createUserValidator from '../middlewares/createUserValidator'

const userRouter = Router()

userRouter.post('/', createUserValidator, createUser)

export default userRouter
