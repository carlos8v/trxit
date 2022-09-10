import { individualRepository } from '@typeorm/repositories/individualRepository'

import { getCurrentIndividualUseCaseFactory } from '@application/useCases/getCurrentIndividual'
import { getCurrentIndividualControllerFactory } from './getCurrentIndividualController'

const getCurrentIndividualUseCase = getCurrentIndividualUseCaseFactory({
  individualRepository
})

export const getCurrentIndividualController = getCurrentIndividualControllerFactory({
  getCurrentIndividualUseCase
})
