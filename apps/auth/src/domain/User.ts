import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

export type UserModel = {
  id?: string
  cpf: string
  name: string
  password: string
  email: string
}

export const saltRounds = 10

export const User = (userData: UserModel) => ({
  ...userData,
  id: userData.id || randomUUID(),
  password: bcrypt.hashSync(userData.password, saltRounds)
})
