import { WalletModel } from '@domain/Wallet'
import { WalletRepository } from '@application/repositories/walletRepository'

import { InMemoryDatabase } from './inMemoryDatabase'

export const InMemoryWalletRepositoryFactory = (database: InMemoryDatabase): WalletRepository => {  
  return {
    save: async (walletData) => {
      database.walletsData.set(walletData.publicKey, walletData)
    },
    findByOwnerId: async (ownerId) => {
      return [...database.walletsData.values()].filter((wallet) => wallet.ownerId === ownerId)
    }
  }
}
