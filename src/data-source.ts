import "reflect-metadata"
import * as fs from "fs"
import { DataSource } from "typeorm"
import { Player } from "./entities/Player"
import { Profile } from "./entities/Profile"

// Load environment variables from .env file to process.env.
require('dotenv').config();

// Create a new DataSource instance.
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.TIDB_HOST || '127.0.0.1',
    port: process.env.TIDB_PORT ? Number(process.env.TIDB_PORT) : 4000,
    username: process.env.TIDB_USER || 'root',
    password: process.env.TIDB_PASSWORD || '',
    database: process.env.TIDB_DATABASE || 'test',
    ssl: process.env.TIDB_ENABLE_SSL === 'true' ? {
        minVersion: 'TLSv1.2',
        ca: process.env.TIDB_CA_PATH ? fs.readFileSync(process.env.TIDB_CA_PATH) : undefined
    } : null,
    synchronize: process.env.NODE_ENV === 'development',
    logging: false,
    entities: [Player, Profile],
    migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
});