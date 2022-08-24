import { Request } from 'express'
import { IHttpHelper } from '@cube/common'

import { UserModel } from '../../domain/User'
import { UserRepository } from '../../repositories/userRepository'

export type GetCurrentUserUseCaseFactory = { userRepository: UserRepository }
export type GetCurrentUserUseCase = (id: string) => Promise<Omit<UserModel, 'password'>>

export type GetCurrentUserControllerFactory = { getCurrentUserUseCase: GetCurrentUserUseCase }
export type GetCurrentUserController = (req: Request) => Promise<IHttpHelper>
