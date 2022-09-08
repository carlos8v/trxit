import { Request } from 'express'
import { created, badRequest } from '@cube/common'

import { CreateIndividualControllerFactory, CreateIndividualController, CreateIndividualData } from './createIndividualDTO'

export const createIndividualControllerFactory = ({
  createIndividualUseCase,
  jwtService
}: CreateIndividualControllerFactory) => {
  const createIndividualController: CreateIndividualController = async (req: Request) => {
    try {
      const individualData = req.body as CreateIndividualData
      const newIndividual = await createIndividualUseCase(individualData)

      const accessToken = jwtService.sign(
        { id: newIndividual.id, email: newIndividual.email },
        newIndividual.id
      )

      const refreshToken = jwtService.signRefresh({}, newIndividual.id)

      req.session = { refreshToken }

      return created({ accessToken })
    } catch (error: Error | any) {
      return badRequest(error?.message)
    }
  }

  return createIndividualController
}
