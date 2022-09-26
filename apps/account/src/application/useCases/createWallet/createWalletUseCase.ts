import { CreateWalletUseCaseFactory } from './createWalletDTO'

import { generateWalletKeyPair, Wallet } from '@domain/Wallet'

export const createWalletUseCaseFactory: CreateWalletUseCaseFactory = ({
  walletRepository
}) => {
  return async (ownerId) => {
    const { privateKey, publicKey } = generateWalletKeyPair()
    const newWallet = Wallet({ ownerId, publicKey })

    await walletRepository.save(newWallet)

    return { ...newWallet, privateKey }
  }
}
