import { randomUUID } from 'crypto'

export type AccountStatus = 'PENDING' | 'ACTIVE' | 'BLOCKED'

export type AccountModel = {
  id: string
  idPerson: string
  name: string
  document: string
  username: string
  inviteId: string
  status: AccountStatus
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

type OptionalCreateProps =
  'id' |
  'status' |
  'inviteId' |
  'createdAt' |
  'updatedAt' |
  'deletedAt'

export type CreateAccountModel = Omit<AccountModel, OptionalCreateProps> & Partial<Pick<AccountModel, OptionalCreateProps>>

const generateInviteId = () => Math.floor(1000 + Math.random() * 9000).toString()

export const Account = (accountData: CreateAccountModel): AccountModel => ({
  ...accountData,
  id: accountData?.id || randomUUID(),
  status: accountData?.status || 'PENDING',
  inviteId: accountData?.inviteId || generateInviteId(),
  createdAt: accountData?.createdAt || new Date(),
  updatedAt: accountData?.updatedAt,
  deletedAt: accountData?.deletedAt
})
