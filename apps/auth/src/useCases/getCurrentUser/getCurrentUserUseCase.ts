import { GetCurrentUserUseCaseFactory, GetCurrentUserUseCase } from './getCurrentUserDTO'

export const getCurrentUserUseCaseFactory = ({ userRepository }: GetCurrentUserUseCaseFactory) => {
  const getCurrentUserUseCase: GetCurrentUserUseCase = async (id: string) => {
    const currentUser = await userRepository.findById(id)
    if (!currentUser?.id) throw new Error('Usuário não encontrado')

    const { password, ...safeUser } = currentUser
    return safeUser
  }

  return getCurrentUserUseCase
}
