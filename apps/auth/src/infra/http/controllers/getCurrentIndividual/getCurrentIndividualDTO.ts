import { HttpController } from '@trxit/common'

import { GetCurrentIndividualUseCase } from '@application/useCases/getCurrentIndividual/getCurrentIndividualDTO'

export type GetCurrentIndividualControllerFactory = (data: {
  getCurrentIndividualUseCase: GetCurrentIndividualUseCase
}) => HttpController
