import { generateKeyPairSync } from 'crypto'

export type WalletType = 'INDIVIDUAL'

export type WalletModel = {
  publicKey: string
  privateKey: string
  ownerId: string
  balance: number
  type: WalletType
  createdAt: Date
  updatedAt?: Date
}

type OptionalCreateProps =
  'publicKey' |
  'privateKey' |
  'balance' |
  'type' |
  'createdAt' |
  'updatedAt'

export type CreateWalletData =
  Omit<WalletModel, OptionalCreateProps> &
  Partial<Pick<WalletModel, OptionalCreateProps>>

export const Wallet = (walletData: CreateWalletData): WalletModel => {
  let publicKey = walletData?.publicKey
  let privateKey = walletData?.privateKey

  if (!publicKey || !privateKey) {
    const newKeys = generateKeyPairSync('ec', { namedCurve: 'secp256k1' })
    publicKey = newKeys.publicKey.export({ format: 'pem', type: 'spki' }).toString()
    privateKey = newKeys.privateKey.export({ format: 'pem', type: 'pkcs8' }).toString()
  }

  return {
    ...walletData,
    publicKey,
    privateKey,
    balance: walletData?.balance || 0,
    type: walletData?.type || 'INDIVIDUAL',
    createdAt: walletData?.createdAt || new Date()
  }
}