import { randomUUID } from 'crypto'

import { Wallet, generateWalletKeyPair } from '@domain/Wallet'

export const walletFactory = (ownerId: string = randomUUID()) => {
  const { publicKey, privateKey } = generateWalletKeyPair()

  return {
    privateKey,
    wallet: Wallet({ publicKey, ownerId })
  }
}
