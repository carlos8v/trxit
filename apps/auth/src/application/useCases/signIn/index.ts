import { userRepository } from '@typeorm/repositories/userRepository'
import { verifyUserPassword } from '@domain/User'

import { signInUseCaseFactory } from './signInUseCase'
import { signInControllerFactory } from './signInController'

import jwt from '@application/services/jwt'

const signInUseCase = signInUseCaseFactory({ userRepository, verifyUserPassword })
const signInController = signInControllerFactory({ signInUseCase, jwtSign: jwt.sign })

export default signInController
