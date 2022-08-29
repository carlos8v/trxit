import { AuthenticateAdminUseCase } from './authenticateAdminDTO'

import jwt from '@application/services/jwt'

export const authenticateAdminUseCase: AuthenticateAdminUseCase = (authSession) => jwt.verify(authSession)
