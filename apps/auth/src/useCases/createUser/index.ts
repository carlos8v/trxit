import { UserRepository } from '../../repositories/UserRepository'
import { createUserControllerFactory } from './createUserController'
import { createUserUseCaseFactory } from './createUserUseCase'

import jwt from 'jsonwebtoken'

const mockedUserRepository: UserRepository = {
  create: (_userData) => Promise.resolve(),
  findByCPF: (_cpf) =>  Promise.resolve(null)
}

const createUserUseCase = createUserUseCaseFactory({ userRepository: mockedUserRepository })
const createUserController = createUserControllerFactory({
  createUserUseCase,
  jwtSign: (payload: any) => jwt.sign(payload, process.env.JWT_SECRET || '')
})

export default createUserController
