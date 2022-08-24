import { userRepository } from '@typeorm/repositories/userRepository'
import { createUserControllerFactory } from './createUserController'
import { createUserUseCaseFactory } from './createUserUseCase'

import jwt from '@application/services/jwt'

const createUserUseCase = createUserUseCaseFactory({ userRepository })
const createUserController = createUserControllerFactory({ createUserUseCase, jwtSign: jwt.sign })

export default createUserController
