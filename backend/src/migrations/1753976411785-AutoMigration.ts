import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1753976411785 implements MigrationInterface {
    name = 'AutoMigration1753976411785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicines" DROP CONSTRAINT "UQ_958eea19aea326a3191d83dc59f"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicines" ADD CONSTRAINT "UQ_958eea19aea326a3191d83dc59f" UNIQUE ("expiration")`);
    }

}
