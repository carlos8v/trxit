import { UserModel } from '../src/domain/User'
import { UserRepository } from '../src/repositories/userRepository'

export const InMemoryUserRepositoryFactory = (): UserRepository => {
  const data: UserModel[] = []

  return {
    create: async (userData) => { data.push(userData) },
    findByCPF: async (cpf) => data.find((user) => user.cpf === cpf) || null,
    findById: async (id) => data.find((user) => user.id === id) || null
  }
}
