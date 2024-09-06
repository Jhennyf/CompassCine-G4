import "reflect-metadata";
import { DataSource } from "typeorm";

// Migrations

// Entities
import Movie from "./entities/Movie";
import Session from "./entities/Session";
import Ticket from "./entities/Ticket";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "compasscine.db",
    synchronize: true,
    logging: false,
    migrations: ["src/database/migrations/**.ts"],
    entities: [Movie, Session, Ticket],
    migrationsTableName: "_migrations",
    migrationsRun: true,
});

AppDataSource.initialize()
    .then(() => {})
    .catch((error) => {throw new Error(error)});
