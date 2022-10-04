import { TransferRepository } from '@application/repositories/transferRepository'

import { InMemoryDatabase } from './inMemoryDatabase'

export const InMemoryTransferRepositoryFactory = (database: InMemoryDatabase): TransferRepository => {
  return {
    save: async (transferData) => {
      database.transferData.set(transferData.id, transferData)
    },
    findByWalletId: async (walletId) => {
      const transfers = [...database.transferData.values()]
        .filter(({ fromWallet, toWallet }) => fromWallet === walletId || toWallet === walletId)

      return transfers
    }
  }
}
