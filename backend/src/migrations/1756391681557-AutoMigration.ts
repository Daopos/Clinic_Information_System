import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1756391681557 implements MigrationInterface {
    name = 'AutoMigration1756391681557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."appointments_status_enum" RENAME TO "appointments_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."appointments_status_enum" AS ENUM('Approved', 'Declined', 'Pending', 'Completed')`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "status" TYPE "public"."appointments_status_enum" USING "status"::"text"::"public"."appointments_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."appointments_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."appointments_status_enum_old" AS ENUM('Approved', 'Declined', 'Pending')`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "status" TYPE "public"."appointments_status_enum_old" USING "status"::"text"::"public"."appointments_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."appointments_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."appointments_status_enum_old" RENAME TO "appointments_status_enum"`);
    }

}
