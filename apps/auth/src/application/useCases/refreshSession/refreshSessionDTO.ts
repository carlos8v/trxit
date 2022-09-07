import { JwtPayload } from 'jsonwebtoken'
import { HttpController } from '@cube/common'

import { IndividualRepository } from '@application/repositories/individualRepository'

type jwtService = {
  verify: (token: string) => string | JwtPayload
  sign: (payload: any, subject: string) => string
  signRefresh: (payload: any, subject: string) => string
}

export type RefreshSessionUseCaseFactory = {
  jwtService: jwtService
  individualRepository: IndividualRepository
}
export type RefreshSessionUseCase = (refreshToken: string) => Promise<{
  accessToken: string
  refreshToken: string
}>

export type RefreshSessionControllerFactory = { refreshSessionUseCase: RefreshSessionUseCase }
export type RefreshSessionController = HttpController
