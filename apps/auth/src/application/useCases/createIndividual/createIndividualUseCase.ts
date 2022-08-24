import { Individual } from '@domain/Individual'

import { CreateIndividualUseCase, CreateIndividualUseCaseFactory } from './createIndividualDTO'

export const createIndividualUseCaseFactory = ({ individualRepository }: CreateIndividualUseCaseFactory) => {
  const createIndividualUseCase: CreateIndividualUseCase = async (individualData) => {
    const individualExists = await individualRepository.findByCPF(individualData.cpf)
    if (individualExists?.cpf) throw new Error('Usuário já existe')

    const newIndividual = await Individual(individualData)
    await individualRepository.create(newIndividual)

    return newIndividual
  }

  return createIndividualUseCase
}
