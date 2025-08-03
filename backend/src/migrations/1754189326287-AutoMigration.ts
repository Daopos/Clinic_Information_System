import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1754189326287 implements MigrationInterface {
    name = 'AutoMigration1754189326287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicine_stocks" DROP CONSTRAINT "FK_7e352debf5f476406563a8c173d"`);
        await queryRunner.query(`ALTER TABLE "medicine_stocks" ADD CONSTRAINT "FK_7e352debf5f476406563a8c173d" FOREIGN KEY ("medicineId") REFERENCES "medicines"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicine_stocks" DROP CONSTRAINT "FK_7e352debf5f476406563a8c173d"`);
        await queryRunner.query(`ALTER TABLE "medicine_stocks" ADD CONSTRAINT "FK_7e352debf5f476406563a8c173d" FOREIGN KEY ("medicineId") REFERENCES "medicines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
