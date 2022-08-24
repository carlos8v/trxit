import { userRepository } from '@typeorm/repositories/userRepository'
import { getCurrentUserControllerFactory } from './getCurrentUserController'
import { getCurrentUserUseCaseFactory } from './getCurrentUserUseCase'

const getCurrentUserUseCase = getCurrentUserUseCaseFactory({ userRepository })
const getCurrentUserController = getCurrentUserControllerFactory({ getCurrentUserUseCase })

export default getCurrentUserController
