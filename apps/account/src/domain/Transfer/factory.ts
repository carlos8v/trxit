import { randomUUID } from 'crypto'
import { CreateTransferData, TransferModel } from './model'

export const Transfer = (transferData: CreateTransferData): TransferModel => ({
  ...transferData,
  id: transferData?.id || randomUUID(),
  signature: transferData?.signature || null,
  status: transferData?.status || 'PENDING',
  type: transferData?.type || 'TRANSFER',
  createdAt: transferData?.createdAt || new Date()
})
