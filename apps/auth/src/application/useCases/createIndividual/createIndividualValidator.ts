import z from 'zod'
import { validateCPF } from 'validations-br'

export const createIndividualSchema = z.object({
  cpf: z.string()
    .length(11)
    .regex(/^\d{11}$/g)
    .refine((val) => validateCPF(val), { message: 'Field must be a valid cpf' }),
  name: z.string().refine((val) => val.split(' ').length >= 2, { message: 'Field must have fullname value' }),
  email: z.string().email(),
  password: z.string().length(4).regex(/^\d{4}$/g)
})
