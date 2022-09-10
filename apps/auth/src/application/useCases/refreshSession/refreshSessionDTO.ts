import { JwtPayload } from 'jsonwebtoken'

import { IndividualRepository } from '@application/repositories/individualRepository'

type jwtService = {
  verify: (token: string) => string | JwtPayload
  sign: (payload: any, subject: string) => string
  signRefresh: (payload: any, subject: string) => string
}

export type RefreshSessionUseCaseFactory = (data: {
  jwtService: jwtService
  individualRepository: IndividualRepository
}) => RefreshSessionUseCase

export type RefreshSessionUseCase = (refreshToken: string) => Promise<{
  accessToken: string
  refreshToken: string
}>
