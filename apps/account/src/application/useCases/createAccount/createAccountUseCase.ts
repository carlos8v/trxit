import { Account } from '@domain/Account'

import { CreateAccountUseCaseFactory } from './createAccountDTO'

export const createAccountUseCaseFactory: CreateAccountUseCaseFactory = ({
  accountRepository
}) => {
  return async (accountData) => {
    const accountExists = await accountRepository.findByDocument(accountData.cpf)
    if (accountExists) throw new Error('Conta já existente')

    const nameArr = accountData.name.split(' ')
    const username = `${nameArr[0].toLocaleLowerCase()}.${nameArr.pop()?.toLocaleLowerCase()}`

    const newAccount = Account({
      ownerId: accountData.id,
      name: accountData.name,
      username,
      document: accountData.cpf,
      status: 'ACTIVE'
    })

    await accountRepository.save(newAccount)

    return newAccount
  }
}
