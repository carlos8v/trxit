import { describe, it, expect } from 'vitest'

import { Transfer } from './factory'
import { walletFactory } from '@tests/db/factories/wallet.factory'

import { signTransfer, verifyTransfer } from './utils'

const { wallet: fromWallet, privateKey } = walletFactory()
const { wallet: toWallet } = walletFactory()

describe('Transfer model', () => {
  it('should create a transfer object with correct values', () => {
    const newTransfer = Transfer({
      amount: 10,
      fromWallet: fromWallet.publicKey,
      toWallet: toWallet.publicKey,
    })

    expect(newTransfer).toEqual(
      expect.objectContaining({
        amount: 10,
        fromWallet: fromWallet.publicKey,
        toWallet: toWallet.publicKey,
        signature: null,
        status: 'PENDING',
        type: 'TRANSFER'
      })
    )
  })

  it('should sign transaction and save correct signature', () => {
    const newTransfer = Transfer({
      amount: 10,
      fromWallet: fromWallet.publicKey,
      toWallet: toWallet.publicKey,
    })

    signTransfer(newTransfer, privateKey)

    expect(newTransfer.signature).not.toBeNull()
    expect(typeof newTransfer.signature).toBe('string')
    expect(verifyTransfer(newTransfer)).toBeTruthy()
  })

  it('should invalidate tampering signed transaction', () => {
    const newTransfer = Transfer({
      amount: 10,
      fromWallet: fromWallet.publicKey,
      toWallet: toWallet.publicKey,
    })

    signTransfer(newTransfer, privateKey)

    newTransfer.amount = 100

    expect(newTransfer).not.toBeNull()
    expect(typeof newTransfer.signature).toBe('string')
    expect(verifyTransfer(newTransfer)).toBeFalsy()
  })
})
