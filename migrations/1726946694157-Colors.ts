import { MigrationInterface, QueryRunner } from 'typeorm';

export class Colors1726946694157 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE "colors" (
            "id" SERIAL NOT NULL, 
            "c_name" character varying NOT NULL, 
            "c_hex" character varying NOT NULL, 
            CONSTRAINT "PK_colors_id" PRIMARY KEY ("id")
        )
    `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "colors"`);
  }
}
