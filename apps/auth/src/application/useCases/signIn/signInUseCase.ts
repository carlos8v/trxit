import { SignInUseCase, SignInUseCaseFactory } from './signInDTO'

export const signInUseCaseFactory = ({ userRepository, verifyUserPassword }: SignInUseCaseFactory) => {
  const signInUseCase: SignInUseCase = async ({ cpf, password }) => {
    const userExists = await userRepository.findByCPF(cpf)
    if (!userExists || !userExists.id) throw new Error('Usuário não encontrado')

    const isValidPassword = await verifyUserPassword(password, userExists.password)
    if (!isValidPassword) throw new Error('Credenciais inválidas')

    const { password: _, ...safeUser } = userExists
    return safeUser
  }

  return signInUseCase
}
