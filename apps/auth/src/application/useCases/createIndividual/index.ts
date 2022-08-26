import { individualRepository } from '@typeorm/repositories/individualRepository'
import { kafkaMessagingAdapter } from '@infra/messaging/kafka/adapters/kafkaMessageAdapter'

import { createIndividualControllerFactory } from './createIndividualController'
import { createIndividualUseCaseFactory } from './createIndividualUseCase'

import jwt from '@application/services/jwt'

const createIndividualUseCase = createIndividualUseCaseFactory({
  individualRepository,
  messagingAdapter: kafkaMessagingAdapter
})
const createIndividualController = createIndividualControllerFactory({ createIndividualUseCase, jwtSign: jwt.sign })

export default createIndividualController
