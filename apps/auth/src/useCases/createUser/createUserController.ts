import { created, badRequest } from '@bank/common'

import { CreateUserControllerFactory, CreateUserController, CreateUserData } from './createUserDTO'

export const createUserControllerFactory = ({
  createUserUseCase,
  jwtSign
}: CreateUserControllerFactory) => {
  const createUserController: CreateUserController = async (req) => {
    try {
      const userData = req.body as CreateUserData
      const newUser = await createUserUseCase(userData)

      const jwt = jwtSign(newUser)

      return created({ accessToken: jwt })
    } catch (error: Error | any) {
      return badRequest(error?.message)
    }
  }

  return createUserController
}
