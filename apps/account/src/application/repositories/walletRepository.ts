import { WalletModel } from '@domain/Wallet'

export interface WalletRepository {
  save(wallerData: WalletModel): Promise<void>
  findById: (walletId: string) => Promise<WalletModel | null>
  findByOwnerId(ownerId: string): Promise<WalletModel[]>
}
