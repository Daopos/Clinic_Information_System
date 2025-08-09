import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1754741195259 implements MigrationInterface {
    name = 'AutoMigration1754741195259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicine_logs" ADD "pharmacistId" integer`);
        await queryRunner.query(`ALTER TABLE "medicine_logs" ADD CONSTRAINT "FK_afbd310549d91e86e0bd356ed68" FOREIGN KEY ("pharmacistId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicine_logs" DROP CONSTRAINT "FK_afbd310549d91e86e0bd356ed68"`);
        await queryRunner.query(`ALTER TABLE "medicine_logs" DROP COLUMN "pharmacistId"`);
    }

}
