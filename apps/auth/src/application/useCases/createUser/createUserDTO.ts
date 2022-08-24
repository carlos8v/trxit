import { Request } from 'express'
import { IHttpHelper } from '@cube/common'

import { UserModel } from '@domain/User'
import { UserRepository } from '@application/repositories/userRepository'

export type CreateUserData = {
  cpf: string
  name: string
  password: string
  email: string
}

export type CreateUserUseCaseFactory = { userRepository: UserRepository }
export type CreateUserUseCase = (userData: CreateUserData) => Promise<UserModel>

export type CreateUserControllerFactory = {
  createUserUseCase: CreateUserUseCase,
  jwtSign: (payload: any) => string
}

export type CreateUserController = (req: Request) => Promise<IHttpHelper>
