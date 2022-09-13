import { RefreshSessionControllerFactory } from './refreshSessionDTO'

import { badRequest, ok, unauthorized } from '@trxit/common'

export const refreshSessionControllerFactory: RefreshSessionControllerFactory = ({
  refreshSessionUseCase
}) => {
  return async (req) => {
    try {
      const { refreshToken: clientRefreshToken } = req.session || {}
      if (!clientRefreshToken) return unauthorized('Credenciais faltando')

      const { accessToken, refreshToken } = await refreshSessionUseCase(clientRefreshToken)
      req.session = { refreshToken }

      return ok({ accessToken })
    } catch (error: Error | any) {
      return badRequest(error?.message)
    }
  }
}
