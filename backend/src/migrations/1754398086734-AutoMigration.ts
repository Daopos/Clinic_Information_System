import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1754398086734 implements MigrationInterface {
    name = 'AutoMigration1754398086734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medicine_logs" ("id" SERIAL NOT NULL, "dispensed_to" character varying NOT NULL, "quantity_dispensed" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "medicineId" integer, "userId" integer, CONSTRAINT "PK_56636cf67e5ff5176c65ae1ebc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "medicine_stocks" DROP COLUMN "stock"`);
        await queryRunner.query(`ALTER TABLE "medicine_stocks" ADD "hand_in" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "medicine_stocks" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."medicine_stocks_type_enum" AS ENUM('IN', 'OUT')`);
        await queryRunner.query(`ALTER TABLE "medicine_stocks" ADD "type" "public"."medicine_stocks_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "medicine_stocks" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "medicine_logs" ADD CONSTRAINT "FK_cd1430a7c6b6224ffbc53b45891" FOREIGN KEY ("medicineId") REFERENCES "medicines"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medicine_logs" ADD CONSTRAINT "FK_9de6457818a72869b6c8462ddfd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medicine_stocks" ADD CONSTRAINT "FK_dea65f454718c37d589f76109ce" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicine_stocks" DROP CONSTRAINT "FK_dea65f454718c37d589f76109ce"`);
        await queryRunner.query(`ALTER TABLE "medicine_logs" DROP CONSTRAINT "FK_9de6457818a72869b6c8462ddfd"`);
        await queryRunner.query(`ALTER TABLE "medicine_logs" DROP CONSTRAINT "FK_cd1430a7c6b6224ffbc53b45891"`);
        await queryRunner.query(`ALTER TABLE "medicine_stocks" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "medicine_stocks" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."medicine_stocks_type_enum"`);
        await queryRunner.query(`ALTER TABLE "medicine_stocks" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "medicine_stocks" DROP COLUMN "hand_in"`);
        await queryRunner.query(`ALTER TABLE "medicine_stocks" ADD "stock" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "medicine_logs"`);
    }

}
