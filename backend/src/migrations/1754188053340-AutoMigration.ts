import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1754188053340 implements MigrationInterface {
  name = "AutoMigration1754188053340";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "medicine_stocks" ("id" SERIAL NOT NULL, "expiration" TIMESTAMP NOT NULL, "stock" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "medicineId" integer, CONSTRAINT "PK_b7490fc9d379e75f6b2d5f3e756" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "medicines" DROP COLUMN "expiration"`);
    await queryRunner.query(`ALTER TABLE "medicines" DROP COLUMN "stock"`);
    await queryRunner.query(
      `ALTER TABLE "medicine_stocks" ADD CONSTRAINT "FK_7e352debf5f476406563a8c173d" FOREIGN KEY ("medicineId") REFERENCES "medicines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medicine_stocks" DROP CONSTRAINT "FK_7e352debf5f476406563a8c173d"`
    );

    // Step 1: Add columns as nullable
    await queryRunner.query(`ALTER TABLE "medicines" ADD "stock" integer`);
    await queryRunner.query(
      `ALTER TABLE "medicines" ADD "expiration" TIMESTAMP`
    );

    // Step 2: Populate with default values to avoid NULL constraint violation
    await queryRunner.query(
      `UPDATE "medicines" SET "stock" = 0 WHERE "stock" IS NULL`
    );
    await queryRunner.query(
      `UPDATE "medicines" SET "expiration" = NOW() WHERE "expiration" IS NULL`
    );

    // Step 3: Alter columns to be NOT NULL
    await queryRunner.query(
      `ALTER TABLE "medicines" ALTER COLUMN "stock" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "medicines" ALTER COLUMN "expiration" SET NOT NULL`
    );

    // Step 4: Drop the medicine_stocks table
    await queryRunner.query(`DROP TABLE "medicine_stocks"`);
  }
}
