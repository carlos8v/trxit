import { generateKeyPairSync } from 'crypto'

export type WalletType = 'INDIVIDUAL'

export type WalletModel = {
  publicKey: string
  ownerId: string
  balance: number
  type: WalletType
  createdAt: Date
  updatedAt?: Date
}

type OptionalCreateProps =
  'balance' |
  'type' |
  'createdAt' |
  'updatedAt'

export type CreateWalletData =
  Omit<WalletModel, OptionalCreateProps> &
  Partial<Pick<WalletModel, OptionalCreateProps>>

export const generateWalletKeyPair = () => {
  const newKeys = generateKeyPairSync('ec', { namedCurve: 'secp256k1' })

  return {
    publicKey: newKeys.publicKey.export({ format: 'der', type: 'spki' }).toString('hex'),
    privateKey: newKeys.privateKey.export({ format: 'der', type: 'pkcs8' }).toString('hex')
  }
}

export const Wallet = (walletData: CreateWalletData): WalletModel => {
  return {
    ...walletData,
    balance: walletData?.balance || 0,
    type: walletData?.type || 'INDIVIDUAL',
    createdAt: walletData?.createdAt || new Date()
  }
}
