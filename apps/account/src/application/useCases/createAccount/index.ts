import { accountRepository } from '@typeorm/repositories/accountRepository'

import { createAccountUseCaseFactory } from './createAccountUseCase'
import { createAccountMessageAdapterFactory } from './createAccountMessageAdapter'

const createAccountUseCase = createAccountUseCaseFactory({ accountRepository })
export const createAccountMessageAdapter = createAccountMessageAdapterFactory({ createAccountUseCase })
