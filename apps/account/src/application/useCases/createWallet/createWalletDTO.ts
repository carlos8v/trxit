import { WalletModel } from '@domain/Wallet'
import { WalletRepository } from '@application/repositories/walletRepository'

export type CreateWalletUseCaseFactory = (data: {
  walletRepository: WalletRepository
}) => CreateWalletUseCase

export type CreateWalletUseCase = (ownerId: string) => Promise<WalletModel & { privateKey: string }>
