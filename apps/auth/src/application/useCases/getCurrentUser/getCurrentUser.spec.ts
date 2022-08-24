import { randomUUID } from 'crypto'

import { UserModel } from '@domain/User'

import { InMemoryUserRepositoryFactory } from '@tests/inMemoryUserRepository'

import { getCurrentUserUseCaseFactory } from './getCurrentUserUseCase'

const makeSut = (): UserModel => ({
  id: randomUUID(),
  name: 'Fulano de Tal',
  cpf: '71854837869',
  email: 'fulanodtal@email.com',
  password: Math.floor(1000 + Math.random() * 9000).toString(),
  createdAt: new Date(),
  updatedAt: null
})

describe('[@cube/auth] Get Current User UseCase', () => {
  it('Should recover user correctly', async () => {
    const mockedNewUser = makeSut()
    const inMemoryUserRepository = InMemoryUserRepositoryFactory()
    inMemoryUserRepository.create(mockedNewUser)

    const getCurrentUserUseCase = getCurrentUserUseCaseFactory({ userRepository: inMemoryUserRepository })

    const response = await getCurrentUserUseCase(mockedNewUser.id)
    expect(response).not.toBeInstanceOf(Error)
    expect(response.id).not.toBeNull()
  })

  it('Should not recover unregistered user', async () => {
    const inMemoryUserRepository = InMemoryUserRepositoryFactory()
    const getCurrentUserUseCase = getCurrentUserUseCaseFactory({ userRepository: inMemoryUserRepository })

    const inexistentUserId = randomUUID()

    await expect(getCurrentUserUseCase(inexistentUserId)).rejects.toThrowError()
    await expect(getCurrentUserUseCase(inexistentUserId)).rejects.toBeInstanceOf(Error)
  })
})
