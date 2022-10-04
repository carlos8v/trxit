import { TransferModel } from '@domain/Transfer'
import { TransferRepository } from '@application/repositories/transferRepository'

export type GetTransfersByWalletIdUseCaseFactory = (data: {
  transferRepository: TransferRepository
}) => GetTransfersByWalletIdUseCase

export type GetTransfersByWalletIdUseCase = (walletId: string) => Promise<TransferModel[]>
