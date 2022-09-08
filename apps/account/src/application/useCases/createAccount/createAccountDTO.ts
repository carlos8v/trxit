import type { IndividualCreatedPayload } from '@cube/common'

import { AccountModel } from '@domain/Account'
import { WalletModel } from '@domain/Wallet'

import { AccountRepository } from '@application/repositories/accountRepository'
import { WalletRepository } from '@application/repositories/walletRepository'

export type CreateAccountData = IndividualCreatedPayload

export type CreateAccountResponse = {
  account: AccountModel
  wallet: WalletModel
}

export type CreateAccountUseCaseFactory = {
  accountRepository: AccountRepository
  walletRepository: WalletRepository
}
export type CreateAccountUseCase = (accountData: CreateAccountData) => Promise<CreateAccountResponse>
