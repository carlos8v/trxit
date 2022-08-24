import { Request } from 'express'
import { created, badRequest } from '@cube/common'

import { CreateIndividualControllerFactory, CreateIndividualController, CreateIndividualData } from './createIndividualDTO'

export const createIndividualControllerFactory = ({
  createIndividualUseCase,
  jwtSign
}: CreateIndividualControllerFactory) => {
  const createIndividualController: CreateIndividualController = async (req: Request) => {
    try {
      const individualData = req.body as CreateIndividualData
      const newIndividual = await createIndividualUseCase(individualData)

      const jwt = jwtSign({ id: newIndividual.id, email: newIndividual.email })
      req.session = { accessToken: jwt }

      return created()
    } catch (error: Error | any) {
      return badRequest(error?.message)
    }
  }

  return createIndividualController
}
