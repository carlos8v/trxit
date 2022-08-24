import { Request } from 'express'
import { IHttpHelper } from '@cube/common'

import { IndividualModel } from '@domain/Individual'
import { IndividualRepository } from '@application/repositories/individualRepository'

export type SignInData = {
  cpf: string
  password: string
}

export type SignInUseCaseFactory = {
  individualRepository: IndividualRepository
  verifyIndividualPassword: (pass: string, IndividualPass: string) => Promise<boolean>
}
export type SignInUseCase = (data: SignInData) => Promise<Omit<IndividualModel, 'password'>>

export type SignInControllerFactory = {
  signInUseCase: SignInUseCase,
  jwtSign: (payload: any) => string
}
export type SignInController = (req: Request) => Promise<IHttpHelper>
