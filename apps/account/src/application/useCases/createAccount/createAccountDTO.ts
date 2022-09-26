import type { IndividualCreatedPayload } from '@trxit/common'

import { AccountModel } from '@domain/Account'

import { AccountRepository } from '@application/repositories/accountRepository'

export type CreateAccountData = IndividualCreatedPayload

export type CreateAccountResponse = AccountModel

export type CreateAccountUseCaseFactory = (data: {
  accountRepository: AccountRepository
}) => CreateAccountUseCase

export type CreateAccountUseCase = (accountData: CreateAccountData) => Promise<CreateAccountResponse>
