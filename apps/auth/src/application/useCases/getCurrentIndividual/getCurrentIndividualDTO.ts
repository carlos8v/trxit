import { Request } from 'express'
import { IHttpHelper } from '@cube/common'

import { IndividualModel } from '@domain/Individual'
import { IndividualRepository } from '@application/repositories/individualRepository'

export type GetCurrentIndividualUseCaseFactory = { individualRepository: IndividualRepository }
export type GetCurrentIndividualUseCase = (id: string) => Promise<Omit<IndividualModel, 'password'>>

export type GetCurrentIndividualControllerFactory = { getCurrentIndividualUseCase: GetCurrentIndividualUseCase }
export type GetCurrentIndividualController = (req: Request) => Promise<IHttpHelper>
