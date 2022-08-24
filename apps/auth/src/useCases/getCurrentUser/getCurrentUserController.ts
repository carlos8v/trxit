import { ok, badRequest, unauthorized } from '@cube/common'
import { Request } from 'express'

import { GetCurrentUserControllerFactory, GetCurrentUserController } from './getCurrentUserDTO'

export const getCurrentUserControllerFactory = ({ getCurrentUserUseCase }: GetCurrentUserControllerFactory) => {
  const getCurrentUserController: GetCurrentUserController = async (req: Request) => {
    try {
      const userId = req.user?.id
      if (!userId) return unauthorized('Usuário não autenticado')

      const currentUser = await getCurrentUserUseCase(userId)

      return ok(currentUser)
    } catch (error: Error | any) {
      return badRequest(error?.message)
    }
  }

  return getCurrentUserController
}
