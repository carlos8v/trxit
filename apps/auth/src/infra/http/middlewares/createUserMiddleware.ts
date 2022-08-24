import { Request } from 'express'

import { ok, unprocessableEntity, expressMiddlewareAdapter } from '@cube/common'

import { createUserSchema } from '@application/useCases/createUser/createUserValidator'

export default expressMiddlewareAdapter(async (req: Request) => {
  const schemaValidation = createUserSchema.safeParse(req.body)
  if (!schemaValidation.success) {
    return unprocessableEntity(schemaValidation.error.issues)
  }

  return ok()
})
