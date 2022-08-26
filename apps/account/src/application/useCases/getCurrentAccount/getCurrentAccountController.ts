import { badRequest, notFound, ok } from '@cube/common'

import { GetCurrentAccountController, GetCurrentAccountControllerFactory } from './getCurrentAccountDTO';

export const getCurrentAccountControllerFactory = ({ getCurrentAccountUseCase }: GetCurrentAccountControllerFactory) => {
  const getCurrentAccountController: GetCurrentAccountController = async (req) => {
    try {
      const personId = req.currentClient?.id as string
      if (!personId) return badRequest('Não é possível encontrar conta')

      const account = await getCurrentAccountUseCase(personId)
      return ok(account)
    } catch(error: Error | any) {
      return notFound(error?.message)
    }
  }

  return getCurrentAccountController
}
