import { dataSource } from '../adapters/dataSource'
import { User } from '../entities/User'
import { UserRepository } from '@application/repositories/userRepository'

const create: UserRepository['create'] = async (userData) => {
  const userRepository = dataSource.getRepository(User)
  await userRepository.save(userData)
}

const findByCPF: UserRepository['findByCPF'] = async (cpf) => {
  const userRepository = dataSource.getRepository(User)
  const user = await userRepository.findOneBy({ cpf })
  return user
}

const findById: UserRepository['findById'] = async (id) => {
  const userRepository = dataSource.getRepository(User)
  const user = await userRepository.findOneBy({ id })
  return user
}

export const userRepository = {
  create,
  findByCPF,
  findById
}
