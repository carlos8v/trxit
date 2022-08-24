import jwt from 'jsonwebtoken'
import { ok, unauthorized, expressMiddlewareAdapter } from '@cube/common'

import { Request } from 'express'
import { UserPayload } from '../types/express'

export default expressMiddlewareAdapter(async (req: Request) => {
  const accessToken = req.session?.accessToken
  if (!jwt) return unauthorized('Usuário não autenticado')

  try {
    const userPayload = jwt.verify(accessToken, process.env.JWT_SECRET || '')
    req.user = userPayload as UserPayload

    return ok()
  } catch(err) {
    return unauthorized('Usuário não autenticado')
  }
})