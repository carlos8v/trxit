import { ok } from '@cube/common'

import { SignOutControllerFactory } from './signOutDTO'

export const signOutControllerFactory: SignOutControllerFactory = () => {
  return async (req) => {
    req.session = null
    return ok()
  }
}
