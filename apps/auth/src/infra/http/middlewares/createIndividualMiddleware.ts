import { Request } from 'express'

import { ok, unprocessableEntity, expressMiddlewareAdapter } from '@cube/common'

import { createIndividualSchema } from '@application/useCases/createIndividual/createIndividualValidator'

export default expressMiddlewareAdapter(async (req: Request) => {
  const schemaValidation = createIndividualSchema.safeParse(req.body)
  if (!schemaValidation.success) {
    return unprocessableEntity(schemaValidation.error.issues)
  }

  return ok()
})
