import { accountRepository } from '@typeorm/repositories/accountRepository'

import { createAccountUseCaseFactory } from './createAccountUseCase'

export const createAccountUseCase = createAccountUseCaseFactory({ accountRepository })
