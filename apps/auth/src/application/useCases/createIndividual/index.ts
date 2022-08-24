import { individualRepository } from '@typeorm/repositories/individualRepository'
import { createIndividualControllerFactory } from './createIndividualController'
import { createIndividualUseCaseFactory } from './createIndividualUseCase'

import jwt from '@application/services/jwt'

const createIndividualUseCase = createIndividualUseCaseFactory({ individualRepository })
const createIndividualController = createIndividualControllerFactory({ createIndividualUseCase, jwtSign: jwt.sign })

export default createIndividualController
