import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1756474611599 implements MigrationInterface {
    name = 'AutoMigration1756474611599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "equipments" ("id" SERIAL NOT NULL, "equipment_name" character varying NOT NULL, "total_quantity" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_250348d5d9ae4946bcd634f3e61" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "equipments"`);
    }

}
