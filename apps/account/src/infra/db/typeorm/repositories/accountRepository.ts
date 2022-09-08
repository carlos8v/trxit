import { dataSource } from '../adapters/dataSource'
import { Account } from '../entities/Account'

import { AccountRepository } from '@application/repositories/accountRepository'

const accountRepository = dataSource.getRepository(Account)

const save: AccountRepository['save'] = async (accountData) => {
  await accountRepository.save(accountData)
}

const findByDocument: AccountRepository['findByDocument'] = async (document) => {
  return accountRepository.findOneBy({ document })
}

const findByIdPerson: AccountRepository['findByIdPerson'] = async (idPerson) => {
  return accountRepository.findOneBy({ idPerson })
}

export const typeormAccountRepository = {
  save,
  findByDocument,
  findByIdPerson
}
