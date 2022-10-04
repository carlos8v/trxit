import { describe, it, expect, beforeAll } from 'vitest'

import { inMemoryDatabaseFactory } from '@tests/db/repositories/inMemoryDatabase'
import { InMemoryTransferRepositoryFactory } from '@tests/db/repositories/inMemoryTransferRepository'

import { Transfer, signTransfer } from '@domain/Transfer'
import { walletFactory } from '@tests/db/factories/wallet.factory'

import { getTransfersByWalletIdUseCaseFactory } from './getTransfersByWalletIdUseCase'

describe('[@trxit/account]: Get transfers by wallet id use case', () => {
  const inMemoryDatabase = inMemoryDatabaseFactory()
  const inMemoryTransferRepository = InMemoryTransferRepositoryFactory(inMemoryDatabase)

  const { wallet: fromWallet, privateKey: fromWalletPrivateKey } = walletFactory()
  const { wallet: toWallet } = walletFactory()

  const getTransfersByWalletIdUseCase = getTransfersByWalletIdUseCaseFactory({
    transferRepository: inMemoryTransferRepository
  })
  
  beforeAll(() => {
    inMemoryDatabase.truncate()

    const firstTransfer = Transfer({ amount: 100, fromWallet: fromWallet.publicKey, toWallet: toWallet.publicKey })
    const secondTransfer = Transfer({ amount: 200, fromWallet: toWallet.publicKey, toWallet: fromWallet.publicKey })

    signTransfer(firstTransfer, fromWalletPrivateKey)

    inMemoryTransferRepository.save({ ...firstTransfer, status: 'FULFILLED' })
    inMemoryTransferRepository.save(secondTransfer)
  })

  it('should return correct transfer array from wallet id', async () => {
    await expect(getTransfersByWalletIdUseCase(fromWallet.publicKey)).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fromWallet: fromWallet.publicKey,
          toWallet: toWallet.publicKey,
          amount: 100,
          status: 'FULFILLED',
          type: 'TRANSFER'
        }),
        expect.objectContaining({
          fromWallet: toWallet.publicKey,
          toWallet: fromWallet.publicKey,
          amount: 200,
          status: 'PENDING',
          type: 'TRANSFER'
        })
      ])
    )
  })

  it('should return correct transfer array to wallet id', async () => {
    await expect(getTransfersByWalletIdUseCase(toWallet.publicKey)).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fromWallet: fromWallet.publicKey,
          toWallet: toWallet.publicKey,
          amount: 100,
          status: 'FULFILLED',
          type: 'TRANSFER'
        }),
        expect.objectContaining({
          fromWallet: toWallet.publicKey,
          toWallet: fromWallet.publicKey,
          amount: 200,
          status: 'PENDING',
          type: 'TRANSFER'
        })
      ])
    )
  })
})
