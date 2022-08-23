import z from 'zod'
import { Request } from 'express'

import { adapters, helpers } from '@bank/common'

const createUserSchema = z.object({
  cpf: z.string().length(11),
  email: z.string().email(),
  password: z.string()
})

export default adapters.expressMiddlewareAdapter(async (req: Request) => {
  const schemaValidation = createUserSchema.safeParse(req.body)
  if (!schemaValidation.success) {
    return helpers.unprocessableEntity(schemaValidation.error.issues)
  }

  return helpers.ok()
})
