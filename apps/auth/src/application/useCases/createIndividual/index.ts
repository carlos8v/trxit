import { individualRepository } from '@typeorm/repositories/individualRepository'
import { redisMessagingAdapter } from '@infra/messaging/redis/adapters/redisMessageAdapter'

import { createIndividualControllerFactory } from './createIndividualController'
import { createIndividualUseCaseFactory } from './createIndividualUseCase'

import jwt from '@application/services/jwt'

const createIndividualUseCase = createIndividualUseCaseFactory({
  individualRepository,
  messagingAdapter: redisMessagingAdapter
})
const createIndividualController = createIndividualControllerFactory({ createIndividualUseCase, jwtService: jwt })

export default createIndividualController
