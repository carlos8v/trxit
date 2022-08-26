import { dataSource } from '../adapters/dataSource'
import { Individual } from '../entities/Individual'
import { IndividualRepository } from '@application/repositories/individualRepository'

const typeormIndividualRepository = dataSource.getRepository(Individual)

const create: IndividualRepository['create'] = async (individualData) => {
  await typeormIndividualRepository.save(individualData)
}

const findByCPF: IndividualRepository['findByCPF'] = async (cpf) => {
  const individual = await typeormIndividualRepository.findOneBy({ cpf })
  return individual
}

const findById: IndividualRepository['findById'] = async (id) => {
  const individual = await typeormIndividualRepository.findOneBy({ id })
  return individual
}

export const individualRepository = {
  create,
  findByCPF,
  findById
}
