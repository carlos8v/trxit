import { individualRepository } from '@typeorm/repositories/individualRepository'
import { getCurrentIndividualControllerFactory } from './getCurrentIndividualController'
import { getCurrentIndividualUseCaseFactory } from './getCurrentIndividualUseCase'

const getCurrentIndividualUseCase = getCurrentIndividualUseCaseFactory({ individualRepository })
const getCurrentIndividualController = getCurrentIndividualControllerFactory({ getCurrentIndividualUseCase })

export default getCurrentIndividualController
