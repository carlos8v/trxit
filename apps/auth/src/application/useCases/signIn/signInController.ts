import { ok, badRequest } from '@cube/common'
import { SignInData, SignInControllerFactory, SignInController } from './signInDTO'

export const signInControllerFactory = ({ signInUseCase, jwtSign }: SignInControllerFactory) => {
  const signInController: SignInController = async (req) => {
    try {
      const signInData = req.body as SignInData
      const signedInIndividual = await signInUseCase(signInData)

      const jwt = jwtSign({ id: signedInIndividual.id, email: signedInIndividual.email })
      req.session = { accessToken: jwt }

      return ok(signedInIndividual)
    } catch (error: Error | any) {
      return badRequest(error?.message)
    }
  }

  return signInController
}
