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

export default (audience: string | string[]) => expressMiddlewareAdapter((req) => {  
  try {
    const authToken = req.headers['authorization']
    if (!authToken) throw new Error('Credenciais faltando')

    const [_, token] = authToken.split(' ')

    const publicKey = Buffer.from(process.env.JWT_PUBLIC_KEY, 'base64')
    const clientPayload = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
      issuer: '@trxit/auth',
      audience: audience
    })

    req.currentClient = clientPayload as ClientPayload

    return ok()
  } catch(err) {
    console.log(err)
    return unauthorized('Usuário não autenticado')
  }
})
