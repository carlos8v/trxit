import { GetCurrentIndividualUseCaseFactory } from './getCurrentIndividualDTO'

export const getCurrentIndividualUseCaseFactory: GetCurrentIndividualUseCaseFactory = ({
  individualRepository
}) => {
  return async (id: string) => {
    const currentIndividual = await individualRepository.findById(id)
    if (!currentIndividual?.id) throw new Error('Usuário não encontrado')

    const { password, ...safeIndividual } = currentIndividual
    return safeIndividual
  }
}
