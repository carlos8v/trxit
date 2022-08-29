import { signInAdminUseCase } from './signInAdminUseCase'
import { signInAdminControllerFactory } from './signInAdminController'

export const signInAdminController = signInAdminControllerFactory({ signInAdminUseCase })
