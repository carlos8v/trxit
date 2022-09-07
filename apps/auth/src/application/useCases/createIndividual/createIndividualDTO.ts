import z from 'zod'

import { HttpController } from '@cube/common'

import { createIndividualSchema } from '@application/useCases/createIndividual/createIndividualValidator'

import { IndividualModel } from '@domain/Individual'
import { IndividualRepository } from '@application/repositories/individualRepository'

import { MessagingAdapter } from '@application/adapters/MessagingAdapter'

export type CreateIndividualData = z.infer<typeof createIndividualSchema>

export type CreateIndividualUseCaseFactory = {
  individualRepository: IndividualRepository
  messagingAdapter: MessagingAdapter
}
export type CreateIndividualUseCase = (individualData: CreateIndividualData) => Promise<IndividualModel>

export type CreateIndividualControllerFactory = {
  createIndividualUseCase: CreateIndividualUseCase,
  jwtSign: (payload: any) => string
}

export type CreateIndividualController = HttpController
