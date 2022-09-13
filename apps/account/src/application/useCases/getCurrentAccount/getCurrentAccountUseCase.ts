import { GetCurrentAccountUseCaseFactory } from './getCurrentAccountDTO'

export const getCurrentAccountUseCaseFactory: GetCurrentAccountUseCaseFactory = ({
  accountRepository
}) => {
  return async (ownerId) => {
    const account = await accountRepository.findByOwnerId(ownerId)
    if (!account) throw new Error('Conta não existente')

    return account
  }
}
