import { ok, badRequest } from '@cube/common'
import { SignInData, SignInControllerFactory, SignInController } from './signInDTO'

export const signInControllerFactory = ({ signInUseCase, jwtSign }: SignInControllerFactory) => {
  const signInController: SignInController = async (req) => {
    try {
      const signInData = req.body as SignInData
      const signedInUser = await signInUseCase(signInData)

      const jwt = jwtSign({ id: signedInUser.id, email: signedInUser.email })
      req.session = { accessToken: jwt }

      return ok(signedInUser)
    } catch (error: Error | any) {
      return badRequest(error?.message)
    }
  }

  return signInController
}
