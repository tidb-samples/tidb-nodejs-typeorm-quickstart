import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1693814724825 implements MigrationInterface {
    name = 'Init1693814724825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profiles\` (\`player_id\` int NOT NULL, \`biography\` text NOT NULL, PRIMARY KEY (\`player_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`players\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`coins\` decimal NOT NULL, \`goods\` int NOT NULL, \`created_at\` datetime NOT NULL, \`profilePlayerId\` int NULL, UNIQUE INDEX \`uk_players_on_name\` (\`name\`), UNIQUE INDEX \`REL_b9666644b90ccc5065993425ef\` (\`profilePlayerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`players\` ADD CONSTRAINT \`fk_profiles_on_player_id\` FOREIGN KEY (\`profilePlayerId\`) REFERENCES \`profiles\`(\`player_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`players\` DROP FOREIGN KEY \`fk_profiles_on_player_id\``);
        await queryRunner.query(`DROP INDEX \`REL_b9666644b90ccc5065993425ef\` ON \`players\``);
        await queryRunner.query(`DROP INDEX \`uk_players_on_name\` ON \`players\``);
        await queryRunner.query(`DROP TABLE \`players\``);
        await queryRunner.query(`DROP TABLE \`profiles\``);
    }

}
