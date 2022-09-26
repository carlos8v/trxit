import { describe, it, expect } from 'vitest'

import { inMemoryDatabaseFactory } from '@tests/db/repositories/inMemoryDatabase'
import { InMemoryWalletRepositoryFactory } from '@tests/db/repositories/inMemoryWalletRepository'

import { getWalletAddress } from '@domain/Wallet'

import { accountFactory } from '@tests/db/factories/account.factory'

import { createWalletUseCaseFactory } from './createWalletUseCase'

describe('[@trxit/account]: Create Wallet use case', () => {
  const inMemoryDatabase = inMemoryDatabaseFactory()
  const inMemoryWalletRepository = InMemoryWalletRepositoryFactory(inMemoryDatabase)

  const createWalletUseCase = createWalletUseCaseFactory({
    walletRepository: inMemoryWalletRepository
  })

  it('should create wallet with correct address', async () => {
    const mockedAccount = accountFactory()

    const result = await createWalletUseCase(mockedAccount.id)

    expect(result.publicKey).not.toBeNull()
    expect(result.privateKey).not.toBeNull()

    expect(result).toEqual(expect.objectContaining({
      ownerId: mockedAccount.id,
      address: getWalletAddress(result.publicKey)
    }))
  })
})
