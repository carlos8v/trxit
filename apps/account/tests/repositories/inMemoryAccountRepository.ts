import { AccountModel } from '@domain/Account'
import { AccountRepository } from '@application/repositories/accountRepository'

export const InMemoryAccountRepositoryFactory = (): AccountRepository => {
  const data: AccountModel[] = []

  return {
    save: async (accountData) => { data.push(accountData) },
    findByDocument: async (document) => data.find((account) => account.document === document) || null,
    findByOwnerId: async (ownerId) => data.find((account) => account.ownerId === ownerId) || null
  }
}
