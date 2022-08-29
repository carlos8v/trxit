import { InMemoryIndividualRepositoryFactory } from '@tests/inMemoryIndividualRepository'

import { Individual } from '@domain/Individual'
import { MessagingAdapter } from '@application/adapters/MessagingAdapter'

import { CreateIndividualData } from './createIndividualDTO'
import { createIndividualUseCaseFactory } from './createIndividualUseCase'

const makeSut = (): CreateIndividualData => ({
  name: 'Fulano de Tal',
  cpf: '71854837869',
  email: 'fulanodtal@email.com',
  password: Math.floor(1000 + Math.random() * 9000).toString()
})

const mockedMessagingAdapter: MessagingAdapter = {
  sendMessage: async () => Promise.resolve(),
  process: async () => Promise.resolve()
}

describe('[@cube/auth]: Create Individual UseCase', () => {
  it('Should create Individual correctly', async () => {
    const inMemoryIndividualRepository = InMemoryIndividualRepositoryFactory()

    const createIndividualUseCase = createIndividualUseCaseFactory({
      individualRepository: inMemoryIndividualRepository,
      messagingAdapter: mockedMessagingAdapter
    })

    const mockedNewIndividual: CreateIndividualData = makeSut()

    const response = await createIndividualUseCase(mockedNewIndividual)
    expect(response).not.toBeInstanceOf(Error)
    expect(response.id).not.toBeNull()
  })

  it('Should not create already registered Individual', async () => {
    const mockedIndividualData = makeSut()
    const mockedIndividual = await Individual(mockedIndividualData)

    const inMemoryIndividualRepository = InMemoryIndividualRepositoryFactory()
    inMemoryIndividualRepository.create(mockedIndividual)

    const createIndividualUseCase = createIndividualUseCaseFactory({
      individualRepository: inMemoryIndividualRepository,
      messagingAdapter: mockedMessagingAdapter
    })

    const { id, ...mockedNewIndividual } = mockedIndividual

    await expect(createIndividualUseCase(mockedNewIndividual)).rejects.toThrowError()
    await expect(createIndividualUseCase(mockedNewIndividual)).rejects.toBeInstanceOf(Error)
  })
})
