import z from 'zod'

import { HttpController } from '@cube/common'

import { createIndividualSchema } from '@application/useCases/createIndividual/createIndividualValidator'

import { IndividualModel } from '@domain/Individual'
import { IndividualRepository } from '@application/repositories/individualRepository'

import { MessagingAdapter } from '@application/adapters/MessagingAdapter'

type JwtService = {
  sign: (payload: any, subject: string) => string
  signRefresh: (payload: any, subject: string) => string
}

export type CreateIndividualData = z.infer<typeof createIndividualSchema>

export type CreateIndividualUseCaseFactory = {
  individualRepository: IndividualRepository
  messagingAdapter: MessagingAdapter
}
export type CreateIndividualUseCase = (individualData: CreateIndividualData) => Promise<IndividualModel>

export type CreateIndividualControllerFactory = {
  createIndividualUseCase: CreateIndividualUseCase,
  jwtService: JwtService
}

export type CreateIndividualController = HttpController
