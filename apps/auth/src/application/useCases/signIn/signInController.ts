import { ok, badRequest } from '@cube/common'
import { SignInData, SignInControllerFactory, SignInController } from './signInDTO'

export const signInControllerFactory = ({ signInUseCase, jwtService }: SignInControllerFactory) => {
  const signInController: SignInController = async (req) => {
    try {
      const signInData = req.body as SignInData
      const signedInIndividual = await signInUseCase(signInData)

      const accessToken = jwtService.sign(
        { id: signedInIndividual.id, email: signedInIndividual.email },
        signedInIndividual.id
      )
      const refreshToken = jwtService.signRefresh({}, signedInIndividual.id)

      req.session = { refreshToken }

      return ok({ accessToken, user: signedInIndividual })
    } catch (error: Error | any) {
      return badRequest(error?.message)
    }
  }

  return signInController
}
