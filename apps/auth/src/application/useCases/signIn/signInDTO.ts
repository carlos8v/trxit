import { HttpController } from '@cube/common'

import { IndividualModel } from '@domain/Individual'
import { IndividualRepository } from '@application/repositories/individualRepository'

export type SignInData = {
  cpf: string
  password: string
}

type JwtService = {
  sign: (payload: any, subject: string) => string
  signRefresh: (payload: any, subject: string) => string
}

export type SignInUseCaseFactory = {
  individualRepository: IndividualRepository
  verifyIndividualPassword: (pass: string, IndividualPass: string) => Promise<boolean>
}
export type SignInUseCase = (data: SignInData) => Promise<Omit<IndividualModel, 'password'>>

export type SignInControllerFactory = {
  signInUseCase: SignInUseCase,
  jwtService: JwtService
}
export type SignInController = HttpController
