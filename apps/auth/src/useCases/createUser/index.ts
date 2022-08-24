import { TypeormUserRepository } from '../../repositories/typeorm/typeormUserRepository'
import { createUserControllerFactory } from './createUserController'
import { createUserUseCaseFactory } from './createUserUseCase'

import jwt from 'jsonwebtoken'

const createUserUseCase = createUserUseCaseFactory({ userRepository: TypeormUserRepository })
const createUserController = createUserControllerFactory({
  createUserUseCase,
  jwtSign: (payload: any) => jwt.sign(payload, process.env.JWT_SECRET || '')
})

export default createUserController
