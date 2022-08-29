import { randomUUID } from 'crypto'

import { InMemoryAccountRepositoryFactory } from '@tests/repositories/inMemoryAccountRepository'

import { Account } from '@domain/Account'

import { CreateAccountData } from './createAccountDTO'
import { createAccountUseCaseFactory } from './createAccountUseCase'

const makeSut = (): CreateAccountData => ({
  id: randomUUID(),
  cpf: '73269427069',
  name: 'Fulano de Tal',
  email: 'fulanodtal@email.com'
})

describe('[@cube/account]: Create Account UseCase', () => {
  it('Should create account normally', async () => {
    const inMemoryAccountRepository = InMemoryAccountRepositoryFactory()
    const repositoryCreateAccountFn = jest.spyOn(inMemoryAccountRepository, 'create')

    const newIndividualCreated = makeSut()
    const createAccountUseCase = createAccountUseCaseFactory({ accountRepository: inMemoryAccountRepository })
    const createAccount = await createAccountUseCase(newIndividualCreated)

    expect(repositoryCreateAccountFn).toBeCalled()
    expect(repositoryCreateAccountFn).toBeCalledTimes(1)
    expect(createAccount).toEqual(
      expect.objectContaining({
        idPerson: newIndividualCreated.id,
        document: newIndividualCreated.cpf,
        name: newIndividualCreated.name,
        username: `${newIndividualCreated.name.split(' ')[0].toLowerCase()}.${newIndividualCreated.name.split(' ').pop()?.toLowerCase()}`,
        status: 'ACTIVE'
      })
    )
  })

  it('Should not create not unique account', async () => {
    const mockedAccountData = makeSut()
    const mockedAccount = Account({
      idPerson: mockedAccountData.id,
      document: mockedAccountData.cpf,
      name: mockedAccountData.name,
      username: 'fulano.tal'
    })

    const inMemoryAccountRepository = InMemoryAccountRepositoryFactory()
    inMemoryAccountRepository.create(mockedAccount)

    const createAccountUseCase = createAccountUseCaseFactory({ accountRepository: inMemoryAccountRepository })
    const repositoryCreateAccountFn = jest.spyOn(inMemoryAccountRepository, 'create')

    await expect(createAccountUseCase(mockedAccountData)).rejects.toThrowError()
    expect(repositoryCreateAccountFn).not.toBeCalled()
  })
})
