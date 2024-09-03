import "reflect-metadata"
import { DataSource } from "typeorm"

import { MigrationName1725393222602 } from './migrations/1725393222602-migrationName'

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "teste.db",
    synchronize: true,
    logging: true,
    migrations: [MigrationName1725393222602],
    migrationsTableName: '_migrations',
    migrationsRun: true,
    
})

AppDataSource.initialize()
    .then(() => {
        
    })
    .catch((error) => console.log(error))