import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class createWalletAddress1664227464039 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropPrimaryKey('wallets')
    await queryRunner.addColumn('wallets', new TableColumn({
      name: 'address',
      type: 'varchar',
      length: '40',
      isNullable: false,
      isPrimary: true
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropPrimaryKey('wallets')
    await queryRunner.createPrimaryKey('wallets', ['public_key'])
  }
}
