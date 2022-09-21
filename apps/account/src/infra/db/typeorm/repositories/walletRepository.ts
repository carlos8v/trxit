import { WalletRepository } from '@application/repositories/walletRepository'

import { dataSource } from '../adapters/dataSource'
import { Wallet } from '../entities/Wallet'

const walletRepository = dataSource.getRepository(Wallet)

export const typeormWalletRepository: WalletRepository = {
  save: async (wallet) => {
    walletRepository.save(wallet)
  },
  findById: async (walletId) => {
    const wallet = await walletRepository.findOneBy({ publicKey: walletId })
    return wallet || null
  },
  findByOwnerId: async (ownerId) => {
    const wallets = await walletRepository.findBy({ ownerId })
    return wallets
  }
}
