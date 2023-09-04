import Decimal from "decimal.js";
import {DataSource} from "typeorm";
import {AppDataSource} from "./data-source";
import {UserService} from "./services/UserService";

/**
 * Get TiDB version.
 */
async function getTiDBVersion(dataSource: DataSource) {
    const rows = await dataSource.query('SELECT VERSION() AS tidb_version;');
    return rows[0]['tidb_version'];
}

/**
 * 🚪Main function.
 */
async function main() {
    const dataSource = await AppDataSource.initialize();
    const userService = new UserService(dataSource);
    try {
        const version = await getTiDBVersion(dataSource);
        console.log(`🔌 Connected to TiDB cluster! (TiDB version: ${version})`);

        const newPlayer = await userService.createPlayer('Alice', new Decimal(100), 100);
        console.log(`🆕 Created a new player with ID ${newPlayer.id}.`);

        const player = await userService.getPlayerByID(newPlayer.id);
        if (!player) {
            throw new Error(`Cannot find player with ID ${newPlayer.id}.`);
        }
        console.log(`ℹ️ Got Player ${player.id}: Player { id: ${player.id}, coins: ${player.coins}, goods: ${player.goods} }`);

        const updatedPlayer = await userService.updatePlayer(player, new Decimal(50), 50);
        console.log(`🔢 Added 50 coins and 50 goods to player ${player.id}, now player ${updatedPlayer.id} has ${updatedPlayer.coins} coins and ${updatedPlayer.goods} goods.`);

        const deletedRows = await userService.deletePlayerByID(player.id);
        console.log(`🚮 Deleted ${deletedRows.affected} player data.`);
    } finally {
        // Step 4. Destroy data source.
        await dataSource.destroy();
    }
}

void main();
