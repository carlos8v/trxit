import { HttpController } from '@trxit/common'

import { RefreshSessionUseCase } from '@application/useCases/refreshSession/refreshSessionDTO'

export type RefreshSessionControllerFactory = (data: {
  refreshSessionUseCase: RefreshSessionUseCase
}) => HttpController
