import { GetWalletBalanceByIdUseCaseFactory } from './getWalletBalanceByIdDTO';

export const getWalletBalanceByIdUseCaseFactory: GetWalletBalanceByIdUseCaseFactory = ({
  walletRepository
}) => {
  return async (walletId) => {
    const wallet = await walletRepository.findById(walletId)
    if (!wallet) throw new Error('Carteira não encontrada')

    return wallet.balance || 0
  }
}
