import { createHash, createSign, createVerify, KeyLike } from 'crypto'

import { TransferModel } from './models'

export {
  CreateTransferData,
  TransferModel
} from './models'

export { Transfer } from './factory'

const createTransferHash = (transfer: TransferModel) => createHash('SHA256')
  .update([
    transfer.fromWalletId,
    transfer.amount,
    transfer.toWalletId,
    transfer?.description || 'x',
    transfer.createdAt
  ].join('-'))
  .digest('hex')

export const signTransfer = (transfer: TransferModel, privateKey: KeyLike): TransferModel => {
  const hash = createTransferHash(transfer)

  const sign = createSign('SHA256')
  sign.write(hash)
  sign.end()

  transfer.signature = sign.sign(privateKey, 'hex')

  return transfer
}

export const verifyTransfer = (transfer: TransferModel, publicKey: KeyLike): boolean => {
  if (!transfer.signature || !transfer.fromWalletId) return false

  const hash = createTransferHash(transfer)

  const verify = createVerify('SHA256')
  verify.write(hash)
  verify.end()

  return verify.verify(publicKey, transfer.signature, 'hex')
}
