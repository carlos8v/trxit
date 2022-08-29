import { Account } from '@domain/Account'

import { CreateAccountUseCaseFactory, CreateAccountUseCase } from './createAccountDTO'

export const createAccountUseCaseFactory = ({ accountRepository }: CreateAccountUseCaseFactory) => {
  const createAccountUseCase: CreateAccountUseCase = async (accountData) => {
    const accountExists = await accountRepository.findByDocument(accountData.cpf)
    if (accountExists) throw new Error('Conta já existente')

    const nameArr = accountData.name.split(' ')
    const username = `${nameArr[0].toLocaleLowerCase()}.${nameArr.pop()?.toLocaleLowerCase()}`

    const newAccount = Account({
      idPerson: accountData.id,
      name: accountData.name,
      username,
      document: accountData.cpf,
      status: 'ACTIVE'
    })

    await accountRepository.create(newAccount)
    return newAccount
  }

  return createAccountUseCase
}
