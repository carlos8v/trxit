import { FindAccountByInviteUseCaseFactory } from './findAccountByInviteIdDTO'

export const findAccountByInviteUseCaseFactory: FindAccountByInviteUseCaseFactory = ({
  accountRepository,
  walletRepository
}) => {
  return async (username, inviteId) => {
    const account = await accountRepository.findByInviteId(username, inviteId)
    if (!account || account.status !== 'ACTIVE') throw new Error('Conta inválida ou bloqueada')

    const wallets = await walletRepository.findByOwnerId(account.id)

    return {
      account,
      wallets
    }
  }
}
