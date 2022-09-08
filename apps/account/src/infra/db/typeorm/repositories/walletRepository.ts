import { WalletRepository } from '@application/repositories/walletRepository'

import { dataSource } from '../adapters/dataSource'
import { Wallet } from '../entities/Wallet'

const walletRepository = dataSource.getRepository(Wallet)

const save: WalletRepository['save'] = async (wallet) => {
  walletRepository.save(wallet)
}

export const typeormWalletRepository: WalletRepository = {
  save
}
