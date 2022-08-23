import { randomUUID } from 'crypto'

import { InMemoryUserRepositoryFactory } from '../../../test/inMemoryUserRepository'

import { UserModel } from '../../domain/User'

import { CreateUserData } from './createUserDTO'
import { createUserUseCaseFactory } from './createUserUseCase'

const makeSut = () => ({
  name: 'Fulano de Tal',
  cpf: '71854837869',
  email: 'fulanodtal@email.com',
  password: Math.floor(1000 + Math.random() * 9000).toString()
})

describe('Create User controller', () => {
  it('Should create user correctly', async () => {
    const inMemoryUserRepository = InMemoryUserRepositoryFactory()

    const createUserUseCase = createUserUseCaseFactory({ userRepository: inMemoryUserRepository })

    const mockedNewUser: CreateUserData = makeSut()

    await expect(createUserUseCase(mockedNewUser)).resolves.not.toThrow()
  })

  it('Should not create already registered user', async () => {
    const mockedUser: UserModel = {
      id: randomUUID(),
      ...makeSut()
    }

    const inMemoryUserRepository = InMemoryUserRepositoryFactory()
    inMemoryUserRepository.create(mockedUser)

    const createUserUseCase = createUserUseCaseFactory({ userRepository: inMemoryUserRepository })

    const { id, ...mockedNewUser } = mockedUser

    await expect(createUserUseCase(mockedNewUser)).rejects.toThrowError()
    await expect(createUserUseCase(mockedNewUser)).rejects.toBeInstanceOf(Error)
  })
})
