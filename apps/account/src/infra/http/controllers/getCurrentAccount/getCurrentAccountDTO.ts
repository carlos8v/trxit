import { HttpController } from '@trxit/common'

import { GetCurrentAccountUseCase } from '@application/useCases/getCurrentAccount/getCurrentAccountDTO'

export type GetCurrentAccountControllerFactory = (data: {
  getCurrentAccountUseCase: GetCurrentAccountUseCase
}) => HttpController
