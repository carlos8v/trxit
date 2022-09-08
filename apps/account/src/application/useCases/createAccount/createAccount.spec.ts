import { randomUUID } from 'crypto'

import { InMemoryAccountRepositoryFactory } from '@tests/repositories/inMemoryAccountRepository'
import { InMemoryWalletRepositoryFactory } from '@tests/repositories/inMemoryWalletRepository'

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
    const InMemoryWalletRepository = InMemoryWalletRepositoryFactory()

    const repositoryCreateAccountFn = jest.spyOn(inMemoryAccountRepository, 'save')
    const repositoryCreateWalletFn = jest.spyOn(InMemoryWalletRepository, 'save')

    const newIndividualCreated = makeSut()
    const createAccountUseCase = createAccountUseCaseFactory({
      accountRepository: inMemoryAccountRepository,
      walletRepository: InMemoryWalletRepository
    })

    const response = await createAccountUseCase(newIndividualCreated)

    expect(repositoryCreateAccountFn).toBeCalled()
    expect(repositoryCreateAccountFn).toBeCalledTimes(1)

    expect(repositoryCreateWalletFn).toBeCalled()
    expect(repositoryCreateWalletFn).toBeCalledTimes(1)

    expect(response.account).toEqual(
      expect.objectContaining({
        idPerson: newIndividualCreated.id,
        document: newIndividualCreated.cpf,
        name: newIndividualCreated.name,
        username: `${newIndividualCreated.name.split(' ')[0].toLowerCase()}.${newIndividualCreated.name.split(' ').pop()?.toLowerCase()}`,
        status: 'ACTIVE'
      })
    )

    expect(response.wallet).toEqual(
      expect.objectContaining({
        ownerId: response.account.id,
        balance: 0,
        type: 'INDIVIDUAL'
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
    const InMemoryWalletRepository = InMemoryWalletRepositoryFactory()

    inMemoryAccountRepository.save(mockedAccount)

    const createAccountUseCase = createAccountUseCaseFactory({
      accountRepository: inMemoryAccountRepository,
      walletRepository: InMemoryWalletRepository
    })

    const repositoryCreateAccountFn = jest.spyOn(inMemoryAccountRepository, 'save')
    const repositoryCreateWalletFn = jest.spyOn(InMemoryWalletRepository, 'save')

    await expect(createAccountUseCase(mockedAccountData)).rejects.toThrowError()
    expect(repositoryCreateAccountFn).not.toBeCalled()
    expect(repositoryCreateWalletFn).not.toBeCalled()
  })
})
