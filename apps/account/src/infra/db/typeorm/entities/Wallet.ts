import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

import { WalletType } from '@domain/Wallet'

@Entity({ name: 'wallets' })
export class Wallet {
  @PrimaryColumn({
    name: 'public_key',
    type: 'varchar',
    length: '176'
  })
  publicKey: string

  @Column({
    name: 'owner_id',
    type: 'uuid'
  })
  ownerId: string

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2
  })
  balance: number

  @Column({
    type: 'varchar',
    length: '15',
    default: 'INDIVIDUAL'
  })
  type: WalletType

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at'
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    nullable: true
  })
  updatedAt?: Date

  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
    nullable: true
  })
  deletedAt?: Date
}
