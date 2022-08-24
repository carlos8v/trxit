import { Request } from 'express'

import { ok, unprocessableEntity, expressMiddlewareAdapter } from '@cube/common'

import { signInSchema } from '@application/useCases/signIn/signInValidator'

export default expressMiddlewareAdapter(async (req: Request) => {
  const schemaValidation = signInSchema.safeParse(req.body)
  if (!schemaValidation.success) {
    return unprocessableEntity(schemaValidation.error.issues)
  }

  return ok()
})
