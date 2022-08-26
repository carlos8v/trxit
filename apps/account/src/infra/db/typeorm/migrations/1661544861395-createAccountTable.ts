import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createAccountTable1661544861395 implements MigrationInterface {
  #schema = process.env.DB_SCHEMA || 'public'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'accounts',
      schema: this.#schema,
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isNullable: false
        },
        {
          name: 'id_person',
          type: 'uuid',
          isNullable: false
        },
        {
          name: 'name',
          type: 'varchar',
          length: '150',
          isNullable: false
        },
        {
          name: 'document',
          type: 'char',
          length: '11',
          isNullable: false
        },
        {
          name: 'username',
          type: 'varchar',
          length: '150',
          isNullable: false
        },
        {
          name: 'invite_id',
          type: 'char',
          length: '4',
          isNullable: false
        },
        {
          name: 'status',
          type: 'varchar',
          length: '50',
          default: `'PENDING'`,
          isNullable: false
        },
        {
          name: 'created_at',
          type: 'timestamptz',
          default: 'now()',
          isNullable: false
        },
        {
          name: 'updated_at',
          type: 'timestamptz',
          isNullable: true
        },
        {
          name: 'deleted_at',
          type: 'timestamptz',
          isNullable: true
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accounts')
  }
}
