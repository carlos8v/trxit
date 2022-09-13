import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

type AccountStatusEnum = 'PENDING' | 'ACTIVE' | 'BLOCKED'

@Entity({ name: 'accounts', schema: process.env.DB_SCHEMA })
export class Account {
  @PrimaryColumn({ type: 'uuid' })
  id: string

  @Column({
    name: 'owner_id',
    type: 'uuid'
  })
  ownerId: string

  @Column({
    type: 'varchar',
    length: '150'
  })
  name: string

  @Column({
    type: 'char',
    length: '11'
  })
  document: string

  @Column({
    type: 'varchar',
    length: '150'
  })
  username: string

  @Column({
    name: 'invite_id',
    type: 'char',
    length: '4'
  })
  inviteId: string

  @Column({
    type: 'varchar',
    length: '50'
  })
  status: AccountStatusEnum

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
