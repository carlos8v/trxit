import { dataSource } from '../adapters/dataSource'
import { Account } from '../entities/Account'

import { AccountRepository } from '@application/repositories/accountRepository'

const typeormAccountRepository = dataSource.getRepository(Account)

const create: AccountRepository['create'] = async (accountData) => {
  await typeormAccountRepository.save(accountData)
}

const findByDocument: AccountRepository['findByDocument'] = async (document) => {
  return typeormAccountRepository.findOneBy({ document })
}

const findByIdPerson: AccountRepository['findByIdPerson'] = async (idPerson) => {
  return typeormAccountRepository.findOneBy({ idPerson })
}

export const accountRepository = {
  create,
  findByDocument,
  findByIdPerson
}
