import { AccountRepository } from '@application/repositories/accountRepository'
import { WalletRepository } from '@application/repositories/walletRepository'

import { AccountModel } from '@domain/Account'
import { WalletModel } from '@domain/Wallet'

export type FindAccountByInviteUseCaseFactory = (data: {
  accountRepository: AccountRepository
  walletRepository: WalletRepository
}) => FindAccountByInviteUseCase

export type FindAccountByInviteUseCase = (username: string, inviteId: string) => Promise<{
  account: AccountModel
  wallets: WalletModel[]
}>
