import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1693838003899 implements MigrationInterface {
    name = 'Init1693838003899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profiles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`biography\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`players\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`coins\` decimal NOT NULL, \`goods\` int NOT NULL, \`created_at\` datetime NOT NULL, \`profile_id\` int NULL, UNIQUE INDEX \`uk_players_on_name\` (\`name\`), UNIQUE INDEX \`REL_ce407ccc96418cd7fa857edead\` (\`profile_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`players\` ADD CONSTRAINT \`fk_players_on_profile_id\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profiles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`players\` DROP FOREIGN KEY \`fk_players_on_profile_id\``);
        await queryRunner.query(`DROP INDEX \`REL_ce407ccc96418cd7fa857edead\` ON \`players\``);
        await queryRunner.query(`DROP INDEX \`uk_players_on_name\` ON \`players\``);
        await queryRunner.query(`DROP TABLE \`players\``);
        await queryRunner.query(`DROP TABLE \`profiles\``);
    }

}
