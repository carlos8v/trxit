import { SignInUseCase, SignInUseCaseFactory } from './signInDTO'

import { verifyIndividualPassword } from '@domain/Individual'

export const signInUseCaseFactory: SignInUseCaseFactory = ({
  individualRepository
}) => {
  const signInUseCase: SignInUseCase = async ({ cpf, password }) => {
    const individualExists = await individualRepository.findByCPF(cpf)
    if (!individualExists || !individualExists.id) throw new Error('Usuário não encontrado')

    const isValidPassword = await verifyIndividualPassword(password, individualExists.password)
    if (!isValidPassword) throw new Error('Credenciais inválidas')

    const { password: _, ...safeIndividual } = individualExists
    return safeIndividual
  }

  return signInUseCase
}
