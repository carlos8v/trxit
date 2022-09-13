import { ZodSchema } from 'zod'

import { HttpController } from '@trxit/common'

import { SignInUseCase } from '@application/useCases/signIn/signInDTO'
export { SignInData } from '@application/useCases/signIn/signInDTO'

type JwtService = {
  sign: (payload: any, subject: string) => string
  signRefresh: (payload: any, subject: string) => string
}

export type SignInControllerFactory = (data: {
  signInUseCase: SignInUseCase,
  jwtService: JwtService
}) => HttpController

export type SignInMiddlewareFactory = (data: {
  signInSchema: ZodSchema
}) => HttpController
