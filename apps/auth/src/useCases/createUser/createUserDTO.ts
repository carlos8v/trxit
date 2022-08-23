import { Request } from 'express'
import { IHttpHelper } from '@bank/common'
import { UserRepository } from '../../repositories/UserRepository'

export type CreateUserData = {
  cpf: string
  name: string
  password: string
  email: string
}

export type CreateUserUseCaseFactory = { userRepository: UserRepository }
export type CreateUserUseCase = (userData: CreateUserData) => Promise<void>

export type CreateUserControllerFactory = { createUserUseCase: CreateUserUseCase }
export type CreateUserController = (req: Request) => Promise<IHttpHelper>
