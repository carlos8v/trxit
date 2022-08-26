import { Individual } from '@domain/Individual'
import { events } from '@cube/common'

import { CreateIndividualUseCase, CreateIndividualUseCaseFactory } from './createIndividualDTO'

export const createIndividualUseCaseFactory = ({
  individualRepository,
  messagingAdapter
}: CreateIndividualUseCaseFactory) => {
  const createIndividualUseCase: CreateIndividualUseCase = async (individualData) => {
    const individualExists = await individualRepository.findByCPF(individualData.cpf)
    if (individualExists?.cpf) throw new Error('Usuário já existe')

    const newIndividual = await Individual(individualData)
    await individualRepository.create(newIndividual)

    await messagingAdapter.sendMessage(events.individualCreated, {
      name: newIndividual.name,
      email: newIndividual.email,
      cpf: newIndividual.cpf,
    })

    return newIndividual
  }

  return createIndividualUseCase
}
