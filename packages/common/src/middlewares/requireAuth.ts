import jwt from 'jsonwebtoken'

import expressMiddlewareAdapter from '../adapters/expressMiddlewareAdapter'

import { ok, unauthorized } from '../helpers/httpHelpers'

export interface ClientPayload {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      currentClient?: ClientPayload;
    }
  }
}

export default expressMiddlewareAdapter(async (req) => {
  const accessToken = req.session?.accessToken
  if (!accessToken) return unauthorized('Usuário não autenticado')

  try {
    const clientPayload = jwt.verify(accessToken, process.env.JWT_SECRET)
    req.currentClient = clientPayload as ClientPayload

    return ok()
  } catch(err) {
    return unauthorized('Usuário não autenticado')
  }
})
