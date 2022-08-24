import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'users', schema: process.env.DB_SCHEMA })
export class User {
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
  updatedAt: Date
}
