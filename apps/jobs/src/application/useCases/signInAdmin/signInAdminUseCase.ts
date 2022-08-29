import jwt from '@application/services/jwt'

import { SignInAdminUseCase } from './signInAdminDTO'

export const signInAdminUseCase: SignInAdminUseCase = (adminData) => {
  if (
    adminData.username !== process.env.DASHBOARD_USER ||
    adminData.password !== process.env.DASHBOARD_PASS
  ) {
    throw new Error('Invalid credentials')
  }

  return jwt.sign({ valid: true })
}
