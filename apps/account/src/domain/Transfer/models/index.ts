type TransferStatus = 'FULFILLED' | 'PENDING' | 'FAILED'
type TransferType = 'DEPOSIT' | 'TRANSFER' | 'REVERSAL'

export type TransferModel = {
  id: string
  signature: string | null
  fromWalletId: string
  toWalletId: string
  amount: number
  status: TransferStatus
  type: TransferType
  description?: string
  createdAt: Date
  updatedAt?: Date
}

type OptionalCreateProps =
  'id' |
  'signature' |
  'status' |
  'type' |
  'createdAt' |
  'updatedAt'

export type CreateTransferData =
  Omit<TransferModel, OptionalCreateProps> &
  Partial<Pick<TransferModel, OptionalCreateProps>>
