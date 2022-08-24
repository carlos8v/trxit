import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

export type UserModel = {
  id: string
  name: string
  email: string
  cpf: string
  password: string
  createdAt: Date
  updatedAt?: Date | null
}

type OptionalCreateProps = 'id' | 'createdAt' | 'updatedAt'
export type CreateUserModel = Omit<UserModel, OptionalCreateProps> & Partial<Pick<UserModel, OptionalCreateProps>>

export const saltRounds = 10

export const User = async (userData: CreateUserModel): Promise<UserModel> => ({
  ...userData,
  id: userData.id || randomUUID(),
  password: await bcrypt.hash(userData.password, saltRounds),
  createdAt: userData.createdAt || new Date(),
  updatedAt: userData?.updatedAt
})

export const verifyUserPassword = (password: string, userPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, userPassword)
}
