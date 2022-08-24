import { GetCurrentIndividualUseCaseFactory, GetCurrentIndividualUseCase } from './getCurrentIndividualDTO'

export const getCurrentIndividualUseCaseFactory = ({ individualRepository }: GetCurrentIndividualUseCaseFactory) => {
  const getCurrentIndividualUseCase: GetCurrentIndividualUseCase = async (id: string) => {
    const currentIndividual = await individualRepository.findById(id)
    if (!currentIndividual?.id) throw new Error('Usuário não encontrado')

    const { password, ...safeIndividual } = currentIndividual
    return safeIndividual
  }

  return getCurrentIndividualUseCase
}
