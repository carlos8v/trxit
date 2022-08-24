import { TypeormUserRepository } from '../../repositories/typeorm/typeormUserRepository'
import { getCurrentUserControllerFactory } from './getCurrentUserController'
import { getCurrentUserUseCaseFactory } from './getCurrentUserUseCase'

const getCurrentUserUseCase = getCurrentUserUseCaseFactory({ userRepository: TypeormUserRepository })
const getCurrentUserController = getCurrentUserControllerFactory({ getCurrentUserUseCase })

export default getCurrentUserController
