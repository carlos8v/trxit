import {
  AuthenticateAdminController as Controller,
  AuthenticateAdminControllerFactory as Factory
} from './authenticateAdminDTO'

import { proxyPath } from '../../utils/proxyPath'

export const authenticateAdminControllerFactory = ({ authenticateAdminUseCase }: Factory) => {
  const authenticateAdminController: Controller = (req, res, next) => {
    try {
      const { admin } = req.session || {}
      if (!admin) throw new Error('Not authenticated')
      
      authenticateAdminUseCase(admin)
      return next()
    } catch (error) {
      req.session = null
      return res.redirect(`${proxyPath}/admin/login?invalid=true`)
    }
  }

  return authenticateAdminController
}
