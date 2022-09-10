import { individualRepository } from '@typeorm/repositories/individualRepository'
import { redisMessagingAdapter } from '@infra/messaging/redis/adapters/redisMessageAdapter'

import { createIndividualUseCaseFactory } from '@application/useCases/createIndividual'
import { createIndividualControllerFactory } from './createIndividualController'

import { createIndividualSchema } from '@application/useCases/createIndividual/createIndividualValidator'
import { createIndividualMiddlewareFactory } from './createIndividualMiddleware'

import jwt from '@application/services/jwt'

const createIndividualUseCase = createIndividualUseCaseFactory({
  individualRepository,
  messagingAdapter: redisMessagingAdapter
})

export const createIndividualMiddleware = createIndividualMiddlewareFactory({
  createIndividualSchema
})

export const createIndividualController = createIndividualControllerFactory({
  createIndividualUseCase,
  jwtService: jwt
})
