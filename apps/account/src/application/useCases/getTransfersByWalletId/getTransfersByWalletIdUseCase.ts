import { GetTransfersByWalletIdUseCaseFactory } from './getTransfersByWalletIdDTO'

export const getTransfersByWalletIdUseCaseFactory: GetTransfersByWalletIdUseCaseFactory = ({
  transferRepository
}) => {
  return async (walletId) => {
    const transfers = await transferRepository.findByWalletId(walletId)
    return transfers
  }
}
