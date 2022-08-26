import { GetCurrentAccountUseCase, GetCurrentAccountUseCaseFactory } from './getCurrentAccountDTO'

export const getCurrentAccountUseCaseFactory = ({ accountRepository }: GetCurrentAccountUseCaseFactory) => {
  const getCurrentAccountUseCase: GetCurrentAccountUseCase = async (idPerson) => {
    const account = await accountRepository.findByIdPerson(idPerson)
    if (!account) throw new Error('Conta não existente')

    return account
  }

  return getCurrentAccountUseCase
}
