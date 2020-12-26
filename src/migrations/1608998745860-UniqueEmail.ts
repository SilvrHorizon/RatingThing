import {MigrationInterface, QueryRunner} from "typeorm";

export class UniqueEmail1608998745860 implements MigrationInterface {
    name = 'UniqueEmail1608998745860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "isAdmin" boolean NOT NULL DEFAULT (false))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "isAdmin") SELECT "id", "email", "password", "isAdmin" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "isAdmin" boolean NOT NULL DEFAULT (0), CONSTRAINT "UQ_ed766a9782779b8390a2a81f444" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "isAdmin") SELECT "id", "email", "password", "isAdmin" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "isAdmin" boolean NOT NULL DEFAULT (false))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "isAdmin") SELECT "id", "email", "password", "isAdmin" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "isAdmin" boolean NOT NULL DEFAULT (false))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "isAdmin") SELECT "id", "email", "password", "isAdmin" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
