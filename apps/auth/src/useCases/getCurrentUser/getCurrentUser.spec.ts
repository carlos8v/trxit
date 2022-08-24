import { InMemoryUserRepositoryFactory } from '../../../test/inMemoryUserRepository'

import { getCurrentUserUseCaseFactory } from './getCurrentUserUseCase'

const makeSut = () => ({
  id: '123',
  name: 'Fulano de Tal',
  cpf: '71854837869',
  email: 'fulanodtal@email.com',
  password: Math.floor(1000 + Math.random() * 9000).toString()
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

    const inexistentUserId = '123'

    await expect(getCurrentUserUseCase(inexistentUserId)).rejects.toThrowError()
    await expect(getCurrentUserUseCase(inexistentUserId)).rejects.toBeInstanceOf(Error)
  })
})
