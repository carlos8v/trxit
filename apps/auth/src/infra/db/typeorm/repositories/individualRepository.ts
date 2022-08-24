import { dataSource } from '../adapters/dataSource'
import { Individual } from '../entities/Individual'
import { IndividualRepository } from '@application/repositories/individualRepository'

const create: IndividualRepository['create'] = async (individualData) => {
  const individualRepository = dataSource.getRepository(Individual)
  await individualRepository.save(individualData)
}

const findByCPF: IndividualRepository['findByCPF'] = async (cpf) => {
  const individualRepository = dataSource.getRepository(Individual)
  const individual = await individualRepository.findOneBy({ cpf })
  return individual
}

const findById: IndividualRepository['findById'] = async (id) => {
  const individualRepository = dataSource.getRepository(Individual)
  const individual = await individualRepository.findOneBy({ id })
  return individual
}

export const individualRepository = {
  create,
  findByCPF,
  findById
}
