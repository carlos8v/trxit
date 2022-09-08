import { typeormAccountRepository } from '@typeorm/repositories/accountRepository'

import { getCurrentAccountUseCaseFactory } from './getCurrentAccountUseCase'
import { getCurrentAccountControllerFactory } from './getCurrentAccountController'

const getCurrentAccountUseCase = getCurrentAccountUseCaseFactory({
  accountRepository: typeormAccountRepository
})

export const getCurrentAccountController = getCurrentAccountControllerFactory({
  getCurrentAccountUseCase
})
