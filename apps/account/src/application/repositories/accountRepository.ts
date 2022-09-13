import { AccountModel } from '@domain/Account'

export interface AccountRepository {
  save(accountData: AccountModel): Promise<void>,
  findByDocument(document: string): Promise<AccountModel | null>
  findByOwnerId(ownerId: string): Promise<AccountModel | null>
  findByInviteId(username: string, inviteId: string): Promise<AccountModel | null>
}
