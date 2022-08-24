import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity({ name: 'individuals', schema: process.env.DB_SCHEMA })
export class Individual {
  @PrimaryColumn({ type: 'uuid' })
  id: string

  @Column({
    type: 'varchar',
    length: '150'
  })
  name: string

  @Column({
    type: 'varchar',
    length: '150'
  })
  email: string

  @Column({
    type: 'char',
    length: '11',
    unique: true
  })
  cpf: string

  @Column({
    type: 'varchar',
    length: '60'
  })
  password: string

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
