import { createHash, createPrivateKey, createPublicKey, createSign, createVerify } from 'crypto'

import { TransferModel } from './model'

const createTransferHash = (transfer: TransferModel) => createHash('SHA256')
  .update([
    transfer.fromWallet,
    transfer.amount,
    transfer.toWallet,
    transfer?.description || 'x',
    transfer.createdAt
  ].join('-'))
  .digest('hex')

export const signTransfer = (transfer: TransferModel, base64PrivateKey: string): TransferModel => {
  const hash = createTransferHash(transfer)

  const signer = createSign('rsa-sha256')
  signer.update(hash)

  const privateKey = createPrivateKey({
    key: Buffer.from(base64PrivateKey, 'base64'),
    format: 'der',
    type: 'pkcs8'
  })

  transfer.signature = signer.sign(privateKey, 'hex')

  return transfer
}

export const verifyTransfer = (transfer: TransferModel): boolean => {
  if (!transfer.signature || !transfer.fromWallet) return false

  const hash = createTransferHash(transfer)

  const verifier = createVerify('rsa-sha256')
  verifier.update(hash)

  const publicKey = createPublicKey({
    key: Buffer.from(transfer.fromWallet, 'base64'),
    format: 'der',
    type: 'spki'
  })

  return verifier.verify(publicKey, transfer.signature, 'hex')
}
