import { individualRepository } from '@typeorm/repositories/individualRepository'
import { verifyIndividualPassword } from '@domain/Individual'

import { signInUseCaseFactory } from './signInUseCase'
import { signInControllerFactory } from './signInController'

import jwt from '@application/services/jwt'

const signInUseCase = signInUseCaseFactory({ individualRepository, verifyIndividualPassword })
const signInController = signInControllerFactory({ signInUseCase, jwtSign: jwt.sign })

export default signInController
