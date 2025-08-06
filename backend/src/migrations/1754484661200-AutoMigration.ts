import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1754484661200 implements MigrationInterface {
    name = 'AutoMigration1754484661200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicine_stocks" ALTER COLUMN "type" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicine_stocks" ALTER COLUMN "type" SET NOT NULL`);
    }

}
