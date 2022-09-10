import { IndividualModel } from '@domain/Individual'
import { IndividualRepository } from '@application/repositories/individualRepository'

type GetCurrentIndividualResponse = Omit<IndividualModel, 'password'>

export type GetCurrentIndividualUseCaseFactory = (data: {
  individualRepository: IndividualRepository
}) => GetCurrentIndividualUseCase

export type GetCurrentIndividualUseCase = (id: string) => Promise<GetCurrentIndividualResponse>
