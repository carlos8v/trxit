import { individualRepository } from '@typeorm/repositories/individualRepository'

import { signInUseCaseFactory } from '@application/useCases/signIn'
import { signInControllerFactory } from './signInController'

import { signInSchema } from '@application/useCases/signIn/signInValidator'
import { signInMiddlewareFactory } from './signInMiddleware'

import jwt from '@application/services/jwt'

const signInUseCase = signInUseCaseFactory({ individualRepository })

export const signInMiddleware = signInMiddlewareFactory({ signInSchema })

export const signInController = signInControllerFactory({ signInUseCase, jwtService: jwt })
