import { Request } from 'express'
import { IHttpHelper } from '@cube/common'

import { UserModel } from '@domain/User'
import { UserRepository } from '@application/repositories/userRepository'

export type SignInData = {
  cpf: string
  password: string
}

export type SignInUseCaseFactory = {
  userRepository: UserRepository
  verifyUserPassword: (pass: string, userPass: string) => Promise<boolean>
}
export type SignInUseCase = (data: SignInData) => Promise<Omit<UserModel, 'password'>>

export type SignInControllerFactory = {
  signInUseCase: SignInUseCase,
  jwtSign: (payload: any) => string
}
export type SignInController = (req: Request) => Promise<IHttpHelper>
