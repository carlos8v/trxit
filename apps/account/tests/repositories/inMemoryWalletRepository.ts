import { WalletModel } from '@domain/Wallet'
import { WalletRepository } from '@application/repositories/walletRepository'

export const InMemoryWalletRepositoryFactory = (): WalletRepository => {
  const data: WalletModel[] = []

  return {
    save: async (walletData) => { data.push(walletData) },
  }
}
