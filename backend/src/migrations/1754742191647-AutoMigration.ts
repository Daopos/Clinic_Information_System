import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1754742191647 implements MigrationInterface {
    name = 'AutoMigration1754742191647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicine_logs" ADD "medicineStockId" integer`);
        await queryRunner.query(`ALTER TABLE "medicine_logs" ADD CONSTRAINT "FK_706c88c88b1c1215dbcdadd1ae6" FOREIGN KEY ("medicineStockId") REFERENCES "medicine_stocks"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicine_logs" DROP CONSTRAINT "FK_706c88c88b1c1215dbcdadd1ae6"`);
        await queryRunner.query(`ALTER TABLE "medicine_logs" DROP COLUMN "medicineStockId"`);
    }

}
