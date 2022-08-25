import { createAccountUseCaseFactory } from './createAccountUseCase'
import { createAccountControllerFactory } from './createAccountController'

const mockedAccountRepository = {
  create: () => Promise.resolve(),
  findByDocument: () => Promise.resolve(null)
}

const createAccountUseCase = createAccountUseCaseFactory({ accountRepository: mockedAccountRepository })
const createAccountController = createAccountControllerFactory({ createAccountUseCase })

export default createAccountController
