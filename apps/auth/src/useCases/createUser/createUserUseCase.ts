import { User } from '../../domain/User'

import { CreateUserUseCase, CreateUserUseCaseFactory } from './createUserDTO'

export const createUserUseCaseFactory = ({ userRepository }: CreateUserUseCaseFactory) => {
  const createUserUseCase: CreateUserUseCase = async (userData) => {
    const userAlreadyExists = await userRepository.findByCPF(userData.cpf)
    if (userAlreadyExists?.cpf) throw new Error('Usuário já existe')

    const newUser = User(userData)
    await userRepository.create(newUser)

    return newUser
  }

  return createUserUseCase
}
