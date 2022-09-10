import jwt from '@application/services/jwt'
import { individualRepository } from '@typeorm/repositories/individualRepository'

import { refreshSessionUseCaseFactory } from '@application/useCases/refreshSession'

import { refreshSessionControllerFactory } from './refreshSessionController'

const refreshSessionUseCase = refreshSessionUseCaseFactory({
  individualRepository,
  jwtService: jwt
})

export const refreshSessionController = refreshSessionControllerFactory({
  refreshSessionUseCase
})
