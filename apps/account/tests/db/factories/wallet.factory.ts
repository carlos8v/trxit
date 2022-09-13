import { randomUUID } from 'crypto'

import { Wallet } from '@domain/Wallet'

export const walletFactory = (ownerId: string = randomUUID()) => Wallet({ ownerId })
