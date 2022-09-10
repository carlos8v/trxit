import { IndividualModel } from '@domain/Individual'

import { IndividualRepository } from '@application/repositories/individualRepository'

export type SignInData = {
  cpf: string
  password: string
}

export type SignInUseCaseFactory = (data: {
  individualRepository: IndividualRepository
}) => SignInUseCase

export type SignInUseCase = (data: SignInData) => Promise<Omit<IndividualModel, 'password'>>
