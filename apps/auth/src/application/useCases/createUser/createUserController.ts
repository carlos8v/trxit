import { Request } from 'express'
import { created, badRequest } from '@cube/common'

import { CreateUserControllerFactory, CreateUserController, CreateUserData } from './createUserDTO'

export const createUserControllerFactory = ({
  createUserUseCase,
  jwtSign
}: CreateUserControllerFactory) => {
  const createUserController: CreateUserController = async (req: Request) => {
    try {
      const userData = req.body as CreateUserData
      const newUser = await createUserUseCase(userData)

      const jwt = jwtSign({ id: newUser.id, email: newUser.email })
      req.session = { accessToken: jwt }

      return created()
    } catch (error: Error | any) {
      return badRequest(error?.message)
    }
  }

  return createUserController
}
