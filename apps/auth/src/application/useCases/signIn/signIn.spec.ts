import { Individual, CreateIndividualModel } from '@domain/Individual'

import { InMemoryIndividualRepositoryFactory } from '@tests/inMemoryIndividualRepository'

import { signInUseCaseFactory } from './signInUseCase'
import { SignInData } from './signInDTO'

const makeSut = (): CreateIndividualModel => ({
  name: 'Fulano de Tal',
  cpf: '71854837869',
  email: 'fulanodtal@email.com',
  password: Math.floor(1000 + Math.random() * 9000).toString()
})

describe('[@cube/auth]: Sign in Individual UseCase', () => {
  it('Should sign in Individual correctly', async () => {
    const mockedIndividualData = makeSut()
    const mockedNewIndividual = await Individual(mockedIndividualData)

    const inMemoryIndividualRepository = InMemoryIndividualRepositoryFactory()
    inMemoryIndividualRepository.create(mockedNewIndividual)

    const signInUseCase = signInUseCaseFactory({
      individualRepository: inMemoryIndividualRepository
    })

    const response = await signInUseCase({ cpf: mockedNewIndividual.cpf, password: mockedIndividualData.password })
    expect(response).not.toBeInstanceOf(Error)
    expect(response.id).not.toBeNull()
  })

  it('Should not recover unregistered Individual', async () => {
    const mockedIndividualData = makeSut()
    const inMemoryIndividualRepository = InMemoryIndividualRepositoryFactory()

    const signInUseCase = signInUseCaseFactory({
      individualRepository: inMemoryIndividualRepository
    })

    const IndividualPayload: SignInData = {
      cpf: mockedIndividualData.cpf,
      password: mockedIndividualData.password
    }

    await expect(signInUseCase(IndividualPayload)).rejects.toThrowError()
    await expect(signInUseCase(IndividualPayload)).rejects.toBeInstanceOf(Error)
  })
})
