import { WalletModel } from '@domain/Wallet'

export interface WalletRepository {
  save(wallerData: WalletModel): Promise<void>
}