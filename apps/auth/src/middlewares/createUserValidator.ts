import z from 'zod'
import { Request } from 'express'

import { ok, unprocessableEntity, expressMiddlewareAdapter } from '@bank/common'

const createUserSchema = z.object({
  cpf: z.string().length(11),
  email: z.string().email(),
  password: z.string()
})

export default expressMiddlewareAdapter(async (req: Request) => {
  const schemaValidation = createUserSchema.safeParse(req.body)
  if (!schemaValidation.success) {
    return unprocessableEntity(schemaValidation.error.issues)
  }

  return ok()
})
