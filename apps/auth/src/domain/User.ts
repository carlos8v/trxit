import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

export type UserModel = {
  id: string
  name: string
  email: string
  cpf: string
  password: string
  createdAt: Date
  updatedAt?: Date
}

type OptionalCreateProps = 'id' | 'createdAt' | 'updatedAt'
type CreateUserModel = Omit<UserModel, OptionalCreateProps> & Partial<Pick<UserModel, OptionalCreateProps>>

export const saltRounds = 10

export const User = (userData: CreateUserModel): UserModel => ({
  ...userData,
  id: userData.id || randomUUID(),
  password: bcrypt.hashSync(userData.password, saltRounds),
  createdAt: userData.createdAt || new Date(),
  updatedAt: userData?.updatedAt
})
