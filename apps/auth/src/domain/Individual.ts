import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

export type IndividualModel = {
  id: string
  name: string
  email: string
  cpf: string
  password: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

type OptionalCreateProps = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
export type CreateIndividualModel = Omit<IndividualModel, OptionalCreateProps> & Partial<Pick<IndividualModel, OptionalCreateProps>>

export const saltRounds = 10

export const Individual = async (individualData: CreateIndividualModel): Promise<IndividualModel> => ({
  ...individualData,
  id: individualData.id || randomUUID(),
  password: await bcrypt.hash(individualData.password, saltRounds),
  createdAt: individualData.createdAt || new Date(),
  updatedAt: individualData?.updatedAt,
  deletedAt: individualData?.deletedAt,
})

export const verifyIndividualPassword = (password: string, individualPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, individualPassword)
}
