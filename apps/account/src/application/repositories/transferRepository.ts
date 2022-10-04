import { TransferModel } from '@domain/Transfer'

export interface TransferRepository {
  save: (transferData: TransferModel) => Promise<void>
  findByWalletId: (walletId: string) => Promise<TransferModel[]>
}
