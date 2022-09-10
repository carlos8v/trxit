import z from 'zod'

import { validateCPF } from 'validations-br'

export const signInSchema = z.object({
  cpf: z.string()
    .length(11)
    .regex(/^\d{11}$/g)
    .refine((val) => validateCPF(val), { message: 'Field must be a valid cpf' }),
  password: z.string().length(4).regex(/^\d{4}$/g)
})
