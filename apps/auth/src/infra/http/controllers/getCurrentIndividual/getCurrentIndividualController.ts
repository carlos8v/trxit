import { ok, badRequest, unauthorized } from '@cube/common'

import { GetCurrentIndividualControllerFactory } from './getCurrentIndividualDTO'

export const getCurrentIndividualControllerFactory: GetCurrentIndividualControllerFactory = ({
  getCurrentIndividualUseCase
}) => {
  return async (req) => {
    try {
      const individualId = req.currentClient?.id
      if (!individualId) return unauthorized('Usuário não autenticado')

      const currentIndividual = await getCurrentIndividualUseCase(individualId)

      return ok(currentIndividual)
    } catch (error: Error | any) {
      return badRequest(error?.message)
    }
  }
}
