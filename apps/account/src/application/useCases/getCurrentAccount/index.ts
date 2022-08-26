import { accountRepository } from '@typeorm/repositories/accountRepository'

import { getCurrentAccountUseCaseFactory } from './getCurrentAccountUseCase'
import { getCurrentAccountControllerFactory } from './getCurrentAccountController'

const getCurrentAccountUseCase = getCurrentAccountUseCaseFactory({ accountRepository })
export const getCurrentAccountController = getCurrentAccountControllerFactory({ getCurrentAccountUseCase })
