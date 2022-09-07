import { RefreshSessionUseCase, RefreshSessionUseCaseFactory } from './refreshSessionDTO'

export const refreshSessionUseCaseFactory = ({
  jwtService,
  individualRepository
}: RefreshSessionUseCaseFactory): RefreshSessionUseCase => {
  return async (token) => {
    const isValidToken = jwtService.verify(token)
    if (
      !isValidToken ||
      !isValidToken.sub ||
      typeof isValidToken.sub !== 'string'
    ) throw new Error('Autenticação falhou')

    const individual = await individualRepository.findById(isValidToken.sub)
    if (!individual) throw new Error('Usuário não encontrado')

    const accessToken = jwtService.sign(
      { id: individual.id, email: individual.email },
      individual.id
    )
    const refreshToken = jwtService.signRefresh({}, individual.id)

    return { accessToken, refreshToken }
  }
}
