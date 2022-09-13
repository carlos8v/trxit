import { Request } from 'express'
import { created, badRequest } from '@trxit/common'

import { CreateIndividualControllerFactory, CreateIndividualData } from './createIndividualDTO'

export const createIndividualControllerFactory: CreateIndividualControllerFactory = ({
  createIndividualUseCase,
  jwtService
}) => {
  return async (req: Request) => {
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
}
