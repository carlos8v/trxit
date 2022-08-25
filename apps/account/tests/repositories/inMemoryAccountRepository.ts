import { AccountModel } from '@domain/Account'
import { AccountRepository } from '@application/repositories/accountRepository'

export const InMemoryAccountRepositoryFactory = (): AccountRepository => {
  const data: AccountModel[] = []

  return {
    create: async (accountData) => { data.push(accountData) },
    findByDocument: async (document) => data.find((account) => account.document === document) || null
  }
}
