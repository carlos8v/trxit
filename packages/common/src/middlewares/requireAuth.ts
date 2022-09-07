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

export default expressMiddlewareAdapter((req) => {  
  try {
    const authToken = req.headers['authorization']
    if (!authToken) throw new Error('Credenciais faltando')

    const [_, token] = authToken.split(' ')
    const clientPayload = jwt.verify(token, process.env.JWT_SECRET)
    req.currentClient = clientPayload as ClientPayload

    return ok()
  } catch(err) {
    return unauthorized('Usuário não autenticado')
  }
})
