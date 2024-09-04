import "reflect-metadata"
import { DataSource } from "typeorm"

// Migrations
import { MigrationName1725393222602 } from './migrations/1725393222602-migrationName';

// Entities
import Movie from "./entities/Movie";
import Session from "./entities/Session";
import Ticket from "./entities/Ticket";



export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "teste.db",
    synchronize: true,
    logging: true,
    migrations: [MigrationName1725393222602],
    entities: [Movie, Session, Ticket],
    migrationsTableName: '_migrations',
    migrationsRun: true,
    
})

AppDataSource.initialize()
    .then(() => {
        
    })
    .catch((error) => console.log(error))