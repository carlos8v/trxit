import { Request } from 'express'

import { ok, unprocessableEntity } from '@cube/common'

import { CreateIndividualMiddlewareFactory } from './createIndividualDTO'

export const createIndividualMiddlewareFactory: CreateIndividualMiddlewareFactory = ({
  createIndividualSchema
}) => {
  return (req: Request) => {
    const schemaValidation = createIndividualSchema.safeParse(req.body)
    if (!schemaValidation.success) {
      return unprocessableEntity(schemaValidation.error.issues)
    }

    return ok()
  }
}
