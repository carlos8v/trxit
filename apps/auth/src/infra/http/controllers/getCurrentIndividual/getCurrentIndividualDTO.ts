import { HttpController } from '@cube/common'

import { GetCurrentIndividualUseCase } from '@application/useCases/getCurrentIndividual/getCurrentIndividualDTO'

export type GetCurrentIndividualControllerFactory = (data: {
  getCurrentIndividualUseCase: GetCurrentIndividualUseCase
}) => HttpController
