import { Account } from '@domain/Account'
import { Wallet } from '@domain/Wallet'

import { CreateAccountUseCaseFactory, CreateAccountUseCase } from './createAccountDTO'

export const createAccountUseCaseFactory = ({
  accountRepository,
  walletRepository
}: CreateAccountUseCaseFactory): CreateAccountUseCase => {
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

    const newWallet = Wallet({ ownerId: newAccount.id })

    await accountRepository.save(newAccount)
    await walletRepository.save(newWallet)

    return { account: newAccount, wallet: newWallet }
  }
}
