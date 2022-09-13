import { MigrationInterface, QueryRunner } from "typeorm"

export class changeIdPersonToOwnerId1663101289753 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('accounts', 'id_person', 'owner_id')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('accounts', 'owner_id', 'id_person')
  }
}
