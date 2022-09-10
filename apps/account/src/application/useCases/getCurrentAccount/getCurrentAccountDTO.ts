import { AccountRepository } from '@application/repositories/accountRepository'

import { AccountModel } from '@domain/Account'

export type GetCurrentAccountUseCaseFactory = (data: {
  accountRepository: AccountRepository
}) => GetCurrentAccountUseCase

export type GetCurrentAccountUseCase = (idPerson: string) => Promise<AccountModel>
