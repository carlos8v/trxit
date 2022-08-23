import { UserRepository } from '../../repositories/UserRepository'
import { createUserControllerFactory } from './createUserController'
import { createUserUseCaseFactory } from './createUserUseCase'

const mockedUserRepository: UserRepository = {
  create: (_userData) => Promise.resolve(),
  findByCPF: (_cpf) =>  Promise.resolve(null)
}

const createUserUseCase = createUserUseCaseFactory({ userRepository: mockedUserRepository })
const createUserController = createUserControllerFactory({ createUserUseCase })

export default createUserController
