import { Request } from 'express'
import { ok, badRequest, unauthorized } from '@cube/common'

import { GetCurrentIndividualControllerFactory, GetCurrentIndividualController } from './getCurrentIndividualDTO'

export const getCurrentIndividualControllerFactory = ({ getCurrentIndividualUseCase }: GetCurrentIndividualControllerFactory) => {
  const getCurrentIndividualController: GetCurrentIndividualController = async (req: Request) => {
    try {
      const individualId = req.user?.id
      if (!individualId) return unauthorized('Usuário não autenticado')

      const currentIndividual = await getCurrentIndividualUseCase(individualId)

      return ok(currentIndividual)
    } catch (error: Error | any) {
      return badRequest(error?.message)
    }
  }

  return getCurrentIndividualController
}
