import { User, CreateUserModel, verifyUserPassword } from '@domain/User'

import { InMemoryUserRepositoryFactory } from '@tests/inMemoryUserRepository'

import { signInUseCaseFactory } from './signInUseCase'
import { SignInData } from './signInDTO'

const makeSut = (): CreateUserModel => ({
  name: 'Fulano de Tal',
  cpf: '71854837869',
  email: 'fulanodtal@email.com',
  password: Math.floor(1000 + Math.random() * 9000).toString()
})

describe('[@cube/auth] Sign in User UseCase', () => {
  it('Should sign in user correctly', async () => {
    const mockedUserData = makeSut()
    const mockedNewUser = await User(mockedUserData)

    const inMemoryUserRepository = InMemoryUserRepositoryFactory()
    inMemoryUserRepository.create(mockedNewUser)

    const signInUseCase = signInUseCaseFactory({
      userRepository: inMemoryUserRepository,
      verifyUserPassword: verifyUserPassword
    })

    const response = await signInUseCase({ cpf: mockedNewUser.cpf, password: mockedUserData.password })
    expect(response).not.toBeInstanceOf(Error)
    expect(response.id).not.toBeNull()
  })

  it('Should not recover unregistered user', async () => {
    const mockedUserData = makeSut()
    const inMemoryUserRepository = InMemoryUserRepositoryFactory()

    const signInUseCase = signInUseCaseFactory({
      userRepository: inMemoryUserRepository,
      verifyUserPassword: verifyUserPassword
    })

    const userPayload: SignInData = {
      cpf: mockedUserData.cpf,
      password: mockedUserData.password
    }

    await expect(signInUseCase(userPayload)).rejects.toThrowError()
    await expect(signInUseCase(userPayload)).rejects.toBeInstanceOf(Error)
  })
})
