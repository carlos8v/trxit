import { randomUUID } from 'crypto'
import { describe, it, expect } from 'vitest'

import { Transfer } from './factory'
import { signTransfer, verifyTransfer } from './utils'

import { Wallet } from '../Wallet'

const fromWallet = Wallet({ ownerId: randomUUID() })
const toWallet = Wallet({ ownerId: randomUUID() })

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

    signTransfer(newTransfer, fromWallet.privateKey)

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

    signTransfer(newTransfer, fromWallet.privateKey)

    newTransfer.amount = 100

    expect(newTransfer).not.toBeNull()
    expect(typeof newTransfer.signature).toBe('string')
    expect(verifyTransfer(newTransfer)).toBeFalsy()
  })
})
