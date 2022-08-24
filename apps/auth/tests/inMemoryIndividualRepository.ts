import { IndividualModel } from '@domain/Individual'
import { IndividualRepository } from '@application/repositories/individualRepository'

export const InMemoryIndividualRepositoryFactory = (): IndividualRepository => {
  const data: IndividualModel[] = []

  return {
    create: async (individualData) => { data.push(individualData) },
    findByCPF: async (cpf) => data.find((individual) => individual.cpf === cpf) || null,
    findById: async (id) => data.find((individual) => individual.id === id) || null
  }
}
