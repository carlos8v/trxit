import { randomUUID } from 'crypto'

export type UserModel = {
  id?: string
  cpf: string
  name: string
  password: string
  email: string
}

export const User = (userData: UserModel) => ({
  id: userData.id || randomUUID(),
  ...userData
})
