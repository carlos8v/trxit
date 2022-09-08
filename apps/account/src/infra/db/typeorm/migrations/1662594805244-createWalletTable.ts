import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createWalletTable1662594805244 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'wallets',
      columns: [
        {
          name: 'public_key',
          type: 'varchar',
          length: '174',
          isPrimary: true,
          isNullable: false
        },
        {
          name: 'private_key',
          type: 'varchar',
          length: '237',
          isNullable: false
        },
        {
          name: 'owner_id',
          type: 'uuid',
          isNullable: false
        },
        {
          name: 'balance',
          type: 'numeric',
          precision: 12,
          scale: 2,
          isNullable: false
        },
        {
          name: 'type',
          type: 'varchar',
          length: '15',
          default: `'INDIVIDUAL'`,
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
      ],
      foreignKeys: [
        {
          columnNames: ['owner_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'accounts',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('wallets')
  }
}
