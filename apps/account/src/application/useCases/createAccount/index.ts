import { typeormAccountRepository } from '@typeorm/repositories/accountRepository'
import { typeormWalletRepository } from '@typeorm/repositories/walletRepository'

import { createAccountUseCaseFactory } from './createAccountUseCase'

export const createAccountUseCase = createAccountUseCaseFactory({
  accountRepository: typeormAccountRepository,
  walletRepository: typeormWalletRepository
})
