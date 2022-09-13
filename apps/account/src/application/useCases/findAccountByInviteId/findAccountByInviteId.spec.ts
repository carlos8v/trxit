import { describe, it, expect, beforeAll } from 'vitest'

import { inMemoryDatabaseFactory } from '@tests/db/repositories/inMemoryDatabase'
import { InMemoryAccountRepositoryFactory } from '@tests/db/repositories/inMemoryAccountRepository'
import { InMemoryWalletRepositoryFactory } from '@tests/db/repositories/inMemoryWalletRepository'

import { findAccountByInviteUseCaseFactory } from './findAccountByInviteIdUseCase'

import { accountFactory } from '@tests/db/factories/account.factory'
import { walletFactory } from '@tests/db/factories/wallet.factory'

const mockedAccount = accountFactory()
const mockedBlockedAccount = accountFactory('BLOCKED')
const mockedWallet = walletFactory(mockedAccount.id)

describe('[@trxit/account]: Find account by invite id use case', () => {
  const inMemoryDatabase = inMemoryDatabaseFactory()
  const inMemoryAccountRepository = InMemoryAccountRepositoryFactory(inMemoryDatabase)
  const inMemoryWalletRepository = InMemoryWalletRepositoryFactory(inMemoryDatabase)

  const findAccountByInviteUseCase = findAccountByInviteUseCaseFactory({
    accountRepository: inMemoryAccountRepository,
    walletRepository: inMemoryWalletRepository
  })

  beforeAll(() => {
    inMemoryAccountRepository.save(mockedAccount)
    inMemoryAccountRepository.save(mockedBlockedAccount)
    inMemoryWalletRepository.save(mockedWallet)
  })
  
  it('should return correct account and wallets', async () => {
    await expect(findAccountByInviteUseCase(
      mockedAccount.username,
      mockedAccount.inviteId
    )).resolves.toEqual(
      expect.objectContaining({
        account: mockedAccount,
        wallets: [mockedWallet]
      })
    )
  })

  it('should throw error if account does not exists', async () => {
    await expect(findAccountByInviteUseCase('not.existent', '123')).rejects.toThrowError()
    await expect(findAccountByInviteUseCase(mockedAccount.username, '123')).rejects.toThrowError()
    await expect(findAccountByInviteUseCase('not.existent', mockedAccount.inviteId)).rejects.toThrowError()
  })

  it('should throw error if account is not active', async () => {
    await expect(findAccountByInviteUseCase(
      mockedBlockedAccount.username,
      mockedBlockedAccount.inviteId
    )).rejects.toThrowError()
  })
})
