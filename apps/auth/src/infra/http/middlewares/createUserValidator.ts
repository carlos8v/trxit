import z from 'zod'
import { Request } from 'express'
import { validateCPF } from 'validations-br'

import { ok, unprocessableEntity, expressMiddlewareAdapter } from '@cube/common'

const createUserSchema = z.object({
  cpf: z.string()
    .length(11)
    .regex(/^\d{11}$/g)
    .refine((val) => validateCPF(val), { message: 'Field must be a valid cpf' }),
  name: z.string().refine((val) => val.split(' ').length >= 2, { message: 'Field must have fullname value' }),
  email: z.string().email(),
  password: z.string().length(4).regex(/^\d{4}$/g)
})

export default expressMiddlewareAdapter(async (req: Request) => {
  const schemaValidation = createUserSchema.safeParse(req.body)
  if (!schemaValidation.success) {
    return unprocessableEntity(schemaValidation.error.issues)
  }

  return ok()
})
