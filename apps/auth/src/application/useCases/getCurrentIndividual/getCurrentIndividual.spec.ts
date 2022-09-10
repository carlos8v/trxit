import { randomUUID } from 'crypto'
import { describe, it, expect } from 'vitest'

import { IndividualModel } from '@domain/Individual'

import { InMemoryIndividualRepositoryFactory } from '@tests/inMemoryIndividualRepository'

import { getCurrentIndividualUseCaseFactory } from './getCurrentIndividualUseCase'

const makeSut = (): IndividualModel => ({
  id: randomUUID(),
  name: 'Fulano de Tal',
  cpf: '71854837869',
  email: 'fulanodtal@email.com',
  password: Math.floor(1000 + Math.random() * 9000).toString(),
  createdAt: new Date()
})

describe('[@cube/auth]: Get Current Individual UseCase', () => {
  it('Should recover Individual correctly', async () => {
    const mockedNewIndividual = makeSut()
    const inMemoryIndividualRepository = InMemoryIndividualRepositoryFactory()
    inMemoryIndividualRepository.create(mockedNewIndividual)

    const getCurrentIndividualUseCase = getCurrentIndividualUseCaseFactory({ individualRepository: inMemoryIndividualRepository })

    const response = await getCurrentIndividualUseCase(mockedNewIndividual.id)
    expect(response).not.toBeInstanceOf(Error)
    expect(response.id).not.toBeNull()
  })

  it('Should not recover unregistered Individual', async () => {
    const inMemoryIndividualRepository = InMemoryIndividualRepositoryFactory()
    const getCurrentIndividualUseCase = getCurrentIndividualUseCaseFactory({ individualRepository: inMemoryIndividualRepository })

    const inexistentIndividualId = randomUUID()

    await expect(getCurrentIndividualUseCase(inexistentIndividualId)).rejects.toThrowError()
    await expect(getCurrentIndividualUseCase(inexistentIndividualId)).rejects.toBeInstanceOf(Error)
  })
})
