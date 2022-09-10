import { GetCurrentAccountUseCaseFactory } from './getCurrentAccountDTO'

export const getCurrentAccountUseCaseFactory: GetCurrentAccountUseCaseFactory = ({
  accountRepository
}) => {
  return async (idPerson) => {
    const account = await accountRepository.findByIdPerson(idPerson)
    if (!account) throw new Error('Conta não existente')

    return account
  }
}
