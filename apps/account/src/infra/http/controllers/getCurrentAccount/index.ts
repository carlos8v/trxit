import { typeormAccountRepository } from '@typeorm/repositories/accountRepository'

import { getCurrentAccountUseCaseFactory } from '@application/useCases/getCurrentAccount'
import { getCurrentAccountControllerFactory } from './getCurrentAccountController'

const getCurrentAccountUseCase = getCurrentAccountUseCaseFactory({
  accountRepository: typeormAccountRepository
})

export const getCurrentAccountController = getCurrentAccountControllerFactory({
  getCurrentAccountUseCase
})
