import { AccountRepository } from '@application/repositories/accountRepository'

import { InMemoryDatabase } from './inMemoryDatabase'

export const InMemoryAccountRepositoryFactory = (database: InMemoryDatabase): AccountRepository => {
  return {
    save: async (accountData) => {
      database.accountsData.set(accountData.id, accountData)
    },
    findByDocument: async (document) => {
      const accountByDocument = database.getByField(database.accountsData, 'document')
      return accountByDocument.get(document) || null
    },
    findByOwnerId: async (ownerId) => {
      const accountByOwnerId = database.getByField(database.accountsData, 'ownerId')
      return accountByOwnerId.get(ownerId) || null
    },
    findByInviteId: async (username, inviteId) => {
      const accountByUsername = database.getByField(database.accountsData, 'username')
      const accountByInviteId = database.getByField(database.accountsData, 'inviteId')

      const usernameAccount  = accountByUsername.get(username)
      const usernameInviteId  = accountByInviteId.get(inviteId)
      if (!usernameAccount || !usernameInviteId) return null

      return usernameAccount?.id === usernameInviteId?.id ? usernameAccount : null
    }
  }
}
