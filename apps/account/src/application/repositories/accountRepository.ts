import { AccountModel } from '@domain/Account'

export interface AccountRepository {
  save(accountData: AccountModel): Promise<void>,
  findByDocument(document: string): Promise<AccountModel | null>
  findByIdPerson(idPerson: string): Promise<AccountModel | null>
}
