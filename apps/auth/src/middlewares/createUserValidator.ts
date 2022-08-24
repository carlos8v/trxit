import z from 'zod'
import { Request } from 'express'

import { ok, unprocessableEntity, expressMiddlewareAdapter } from '@cube/common'

const createUserSchema = z.object({
  cpf: z.string().length(11),
  name: z.string(),
  email: z.string().email(),
  password: z.string().length(4).regex(/^\d{4}$/)
})

export default expressMiddlewareAdapter(async (req: Request) => {
  const schemaValidation = createUserSchema.safeParse(req.body)
  if (!schemaValidation.success) {
    return unprocessableEntity(schemaValidation.error.issues)
  }

  return ok()
})
