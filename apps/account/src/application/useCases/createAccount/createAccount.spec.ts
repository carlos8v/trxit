import { InMemoryAccountRepositoryFactory } from '@tests/repositories/inMemoryAccountRepository'

import { Account } from '@domain/Account'

import { CreateAccountData } from './createAccountDTO'
import { createAccountUseCaseFactory } from './createAccountUseCase'

const makeSut = (): CreateAccountData => ({
  cpf: '73269427069',
  name: 'Fulando de Tal',
  email: 'fulanodtal@email.com'
})

describe('[@cube/account] Create Account UseCase', () => {
  it('Should create account normally', async () => {
    const inMemoryAccountRepository = InMemoryAccountRepositoryFactory()
    const repositoryCreateAccountFn = jest.spyOn(inMemoryAccountRepository, 'create')

    const newIndividualCreated = makeSut()
    const createAccountUseCase = createAccountUseCaseFactory({ accountRepository: inMemoryAccountRepository })
    await createAccountUseCase(newIndividualCreated)

    expect(repositoryCreateAccountFn).toBeCalled()
    expect(repositoryCreateAccountFn).toBeCalledTimes(1)
  })

  it('Should not create not unique account', async () => {
    const mockedAccountData = makeSut()
    const mockedAccount = Account({
      document: mockedAccountData.cpf,
      name: mockedAccountData.name,
      username: 'fulanotal'
    })

    const inMemoryAccountRepository = InMemoryAccountRepositoryFactory()
    inMemoryAccountRepository.create(mockedAccount)

    const createAccountUseCase = createAccountUseCaseFactory({ accountRepository: inMemoryAccountRepository })
    const repositoryCreateAccountFn = jest.spyOn(inMemoryAccountRepository, 'create')

    await expect(createAccountUseCase(mockedAccountData)).rejects.toThrowError()
    expect(repositoryCreateAccountFn).not.toBeCalled()
  })
})
