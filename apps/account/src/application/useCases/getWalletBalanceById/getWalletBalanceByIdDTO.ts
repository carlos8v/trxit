import { WalletRepository } from '@application/repositories/walletRepository'

export type GetWalletBalanceByIdUseCaseFactory = (data: {
  walletRepository: WalletRepository
}) => GetWalletBalanceByIdUseCase

export type GetWalletBalanceByIdUseCase = (walletId: string) => Promise<number>
