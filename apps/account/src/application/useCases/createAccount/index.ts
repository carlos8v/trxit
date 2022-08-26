import { createAccountUseCaseFactory } from './createAccountUseCase'
import { createAccountMessageAdapterFactory } from './createAccountMessageAdapter'

const mockedAccountRepository = {
  create: () => Promise.resolve(),
  findByDocument: () => Promise.resolve(null)
}

const createAccountUseCase = createAccountUseCaseFactory({ accountRepository: mockedAccountRepository })
export const createAccountMessageAdapter = createAccountMessageAdapterFactory({ createAccountUseCase })
