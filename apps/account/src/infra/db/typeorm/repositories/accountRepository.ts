import { dataSource } from '../adapters/dataSource'
import { Account } from '../entities/Account'

import { AccountRepository } from '@application/repositories/accountRepository'

const accountRepository = dataSource.getRepository(Account)

export const typeormAccountRepository: AccountRepository = {
  save: async (accountData) => {
    await accountRepository.save(accountData)
  },
  findByInviteId: async (username, inviteId) => {
    const account = await accountRepository.findOneBy({ username, inviteId })
    return account || null
  },
  findByDocument: async (document) => {
    return accountRepository.findOneBy({ document })
  },
  findByOwnerId: async (ownerId) => {
    return accountRepository.findOneBy({ ownerId })
  },
}
