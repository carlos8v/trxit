import type { IndividualCreatedPayload } from '@cube/common'

import { AccountModel } from '@domain/Account'
import { AccountRepository } from '../../repositories/accountRepository'

export type CreateAccountData = IndividualCreatedPayload

export type CreateAccountUseCaseFactory = { accountRepository: AccountRepository }
export type CreateAccountUseCase = (accountData: CreateAccountData) => Promise<AccountModel>
