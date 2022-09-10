import { ZodSchema } from 'zod'

import { HttpController } from '@cube/common'

import { CreateIndividualUseCase } from '@application/useCases/createIndividual/createIndividualDTO'
export { CreateIndividualData } from '@application/useCases/createIndividual/createIndividualDTO'

type JwtService = {
  sign: (payload: any, subject: string) => string
  signRefresh: (payload: any, subject: string) => string
}

export type CreateIndividualControllerFactory = (data: {
  createIndividualUseCase: CreateIndividualUseCase
  jwtService: JwtService
}) => HttpController

export type CreateIndividualMiddlewareFactory = (data: {
  createIndividualSchema: ZodSchema
}) => HttpController
