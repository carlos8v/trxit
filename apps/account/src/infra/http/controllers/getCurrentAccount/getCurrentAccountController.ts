import { badRequest, notFound, ok } from '@cube/common'

import { GetCurrentAccountControllerFactory } from './getCurrentAccountDTO'

export const getCurrentAccountControllerFactory: GetCurrentAccountControllerFactory = ({
  getCurrentAccountUseCase
}) => {
  return async (req) => {
    try {
      const personId = req.currentClient?.id as string
      if (!personId) return badRequest('Não é possível encontrar conta')

      const account = await getCurrentAccountUseCase(personId)
      return ok(account)
    } catch (error: Error | any) {
      return notFound(error?.message)
    }
  }
}
