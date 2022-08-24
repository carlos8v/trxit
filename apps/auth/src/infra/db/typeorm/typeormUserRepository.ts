import { UserRepository } from '@application/repositories/userRepository'

const mockedTypeormUserRepository: UserRepository = {
  create: () => Promise.resolve(),
  findByCPF: () =>  Promise.resolve(null),
  findById: () => Promise.resolve(null)
}

export const TypeormUserRepository = mockedTypeormUserRepository
