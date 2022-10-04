import { describe, it, expect, beforeAll } from 'vitest'

import { inMemoryDatabaseFactory } from '@tests/db/repositories/inMemoryDatabase'
import { InMemoryWalletRepositoryFactory } from '@tests/db/repositories/inMemoryWalletRepository'

import { walletFactory } from '@tests/db/factories/wallet.factory'

import { getWalletBalanceByIdUseCaseFactory } from './getWalletBalanceByIdUseCase'

describe('[@trxit/account]: Get wallet balance by id use case', () => {
  const inMemoryDatabase = inMemoryDatabaseFactory()
  const inMemoryWalletRepository = InMemoryWalletRepositoryFactory(inMemoryDatabase)

  const getWalletBalanceByIdUseCase = getWalletBalanceByIdUseCaseFactory({
    walletRepository: inMemoryWalletRepository
  })
  
  beforeAll(() => {
    inMemoryDatabase.truncate()
  })

  it('should return correct balance for existent wallet', async () => {
    const { wallet: mockedWallet } = walletFactory()

    inMemoryWalletRepository.save({ ...mockedWallet, balance: 100 })
    await expect(getWalletBalanceByIdUseCase(mockedWallet.publicKey)).resolves.toBe(100)

    inMemoryWalletRepository.save({ ...mockedWallet, balance: 150 })
    await expect(getWalletBalanceByIdUseCase(mockedWallet.publicKey)).resolves.toBe(150)
  })

  it('should throw error if wallet does not exist', async () => {
    await expect(getWalletBalanceByIdUseCase('123')).rejects.toThrowError()
  })
})
