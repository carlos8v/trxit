import { ok } from '@cube/common'

import { SignOutController } from './signOutDTO'

export const signOutControllerFactory = () => {
  const signOutController: SignOutController = async (req) => {
    req.session = null
    return ok()
  }

  return signOutController
}
