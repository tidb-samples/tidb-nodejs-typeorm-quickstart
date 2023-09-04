import Decimal from "decimal.js";
import {DataSource} from "typeorm";
import {Player} from "../entities/Player";

export class UserService {

  constructor(readonly dataSource: DataSource) {

  }

  /**
   * 🆕 CREATE a new player.
   */
  async createPlayer(name: string, coins: Decimal, goods: number) {
    const player = new Player(name, coins, goods);
    return await this.dataSource.manager.save<Player>(player);
  }

  /**
   * ℹ️ READ player information by ID.
   */
  async getPlayerByID(id: number) {
    return await this.dataSource.manager.findOneBy(Player, {
      id: id
    });
  }

  /**
   * 🔢 UPDATE player.
   */
  async updatePlayer(player: Player, incCoins: Decimal, incGoods: number) {
    player.coins.add(incCoins);
    player.goods += incGoods;
    return await this.dataSource.manager.save(player);
  }

  /**
   * 🚮 DELETE player by ID.
   */
  async deletePlayerByID(playerId: number) {
    return await this.dataSource.manager.delete(Player, {
      id: playerId
    });
  }

}