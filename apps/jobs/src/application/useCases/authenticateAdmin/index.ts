import { authenticateAdminUseCase } from './authenticateAdminUseCase'
import { authenticateAdminControllerFactory } from './authenticateAdminController'

export const authenticateAdminController = authenticateAdminControllerFactory({ authenticateAdminUseCase })
