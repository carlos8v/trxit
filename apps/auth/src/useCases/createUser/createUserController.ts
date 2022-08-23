import { helpers } from '@bank/common'
import { CreateUserControllerFactory, CreateUserController, CreateUserData } from './createUserDTO'

export const createUserControllerFactory = ({ createUserUseCase }: CreateUserControllerFactory) => {
  const createUserController: CreateUserController = async (req) => {
    try {
      const userData = req.body as CreateUserData
      await createUserUseCase(userData)
      return helpers.created()
    } catch (error: Error | any) {
      return helpers.badRequest(error?.message)
    }
  }

  return createUserController
}
