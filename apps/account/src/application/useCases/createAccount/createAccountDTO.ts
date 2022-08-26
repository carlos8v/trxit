import { AccountRepository } from '../../repositories/accountRepository'

export type CreateAccountData = {
  name: string
  email: string
  cpf: string
}

export type CreateAccountUseCaseFactory = { accountRepository: AccountRepository }
export type CreateAccountUseCase = (accountData: CreateAccountData) => Promise<void>

export type CreateAccountMessageAdapterFactory = { createAccountUseCase: CreateAccountUseCase }
export type CreateAccountMessageAdapter = (account: string) => Promise<void>
