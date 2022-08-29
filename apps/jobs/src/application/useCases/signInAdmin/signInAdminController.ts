import {
  AdminData,
  SignInAdminController,
  SignInControllerFactory
} from './signInAdminDTO'

import { proxyPath } from '../../utils/proxyPath'

export const signInAdminControllerFactory = ({ signInAdminUseCase }: SignInControllerFactory) => {
  const signInAdminController: SignInAdminController = (req, res) => {
    const adminData = req.body

    if (!adminData || !adminData?.username || !adminData?.password) {
      return res.redirect(`${proxyPath}/admin/login?invalid=true`)
    }

    try {
      const token = signInAdminUseCase(adminData as AdminData)
      req.session = { admin: token }
  
      return res.redirect(`${proxyPath}/admin`)
    } catch(err) {
      return res.redirect(`${proxyPath}/admin/login?invalid=true`)
    }
  }

  return signInAdminController
}
