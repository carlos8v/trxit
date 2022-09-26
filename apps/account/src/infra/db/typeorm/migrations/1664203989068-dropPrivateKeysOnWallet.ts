import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class dropPrivateKeysOnWallet1664203989068 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('wallets', 'private_key')
    await queryRunner.changeColumn('wallets', 'public_key', new TableColumn({
      name: 'public_key',
      type: 'varchar',
      length: '176',
      isPrimary: true,
      isNullable: false
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('wallets', new TableColumn({
      name: 'private_key',
      type: 'varchar',
      length: '180',
      isNullable: false
    }))

    await queryRunner.changeColumn('wallets', 'public_key', new TableColumn({
      name: 'public_key',
      type: 'varchar',
      length: '120',
      isPrimary: true,
      isNullable: false
    }))
  }
}
