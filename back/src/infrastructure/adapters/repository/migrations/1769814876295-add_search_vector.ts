import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSearchVector1769814876295 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE "properties"
            ADD COLUMN IF NOT EXISTS "search_vector" tsvector;`
        );

        await queryRunner.query(`DROP INDEX IF EXISTS "properties_search_idx"`);

        await queryRunner.query(`
            CREATE INDEX "properties_search_idx"
            ON "properties"
            USING GIN("search_vector")`
        );

        await queryRunner.query(`
            DROP FUNCTION IF EXISTS properties_tsv_trigger CASCADE`);

        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION properties_tsv_trigger()
            RETURNS TRIGGER AS $$
            DECLARE neigh_name VARCHAR;
            BEGIN
                SELECT name INTO neigh_name FROM neighborhoods WHERE id = NEW.neighborhood_id;
                NEW.search_vector := 
                    setweight(to_tsvector('spanish',coalesce(NEW.address, '')),'A') ||
                    setweight(to_tsvector('spanish',coalesce(neigh_name, '')), 'B');
                RETURN NEW;
            END
            $$ LANGUAGE plpgsql;`
        );

        await queryRunner.query(`DROP TRIGGER IF EXISTS tsvectorupdate ON "properties"`);

        await queryRunner.query(`
            CREATE TRIGGER tsvectorupdate
            BEFORE INSERT OR UPDATE ON properties
            FOR EACH ROW EXECUTE PROCEDURE 
                properties_tsv_trigger();`
        );

        await queryRunner.query(`
            UPDATE "properties" SET id = id;`
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            DROP TRIGGER IF EXISTS tsvectorupdate ON "properties";`
        );

        await queryRunner.query(`
            DROP FUNCTION IF EXISTS properties_tsv_trigger;`
        );

        await queryRunner.query(`
            DROP INDEX "properties_search_idx";`
        );

        await queryRunner.query(`
            ALTER TABLE "properties"
            DROP COLUMN "search_vector";`
        );

    }

}
