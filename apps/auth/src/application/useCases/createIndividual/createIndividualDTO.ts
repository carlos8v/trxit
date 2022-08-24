import z from 'zod'
import { Request } from 'express'
import { IHttpHelper } from '@cube/common'

import { createIndividualSchema } from '@application/useCases/createIndividual/createIndividualValidator'

import { IndividualModel } from '@domain/Individual'
import { IndividualRepository } from '@application/repositories/individualRepository'

export type CreateIndividualData = z.infer<typeof createIndividualSchema>

export type CreateIndividualUseCaseFactory = { individualRepository: IndividualRepository }
export type CreateIndividualUseCase = (individualData: CreateIndividualData) => Promise<IndividualModel>

export type CreateIndividualControllerFactory = {
  createIndividualUseCase: CreateIndividualUseCase,
  jwtSign: (payload: any) => string
}

export type CreateIndividualController = (req: Request) => Promise<IHttpHelper>
