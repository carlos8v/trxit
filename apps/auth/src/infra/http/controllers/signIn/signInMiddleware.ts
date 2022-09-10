import { Request } from 'express'

import { ok, unprocessableEntity } from '@cube/common'

import { SignInMiddlewareFactory } from './signInDTO'

export const signInMiddlewareFactory: SignInMiddlewareFactory = ({
  signInSchema
}) => {
  return async (req: Request) => {
    const schemaValidation = signInSchema.safeParse(req.body)
    if (!schemaValidation.success) {
      return unprocessableEntity(schemaValidation.error.issues)
    }

    return ok()
  }
}
