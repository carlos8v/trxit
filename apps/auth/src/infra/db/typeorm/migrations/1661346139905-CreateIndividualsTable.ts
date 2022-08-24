import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserTable1661346139905 implements MigrationInterface {
  #schema = process.env.DB_SCHEMA || 'public'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'individuals',
      schema: this.#schema,
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isNullable: false
        },
        {
          name: 'name',
          type: 'varchar',
          length: '150',
          isNullable: false
        },
        {
          name: 'email',
          type: 'varchar',
          length: '150',
          isNullable: false
        },
        {
          name: 'cpf',
          type: 'char',
          length: '11',
          isUnique: true
        },
        {
          name: 'password',
          type: 'varchar',
          length: '60'
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
    await queryRunner.dropTable('individuals')
  }
}
