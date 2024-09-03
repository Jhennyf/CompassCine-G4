import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MigrationName1725393222602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'teste',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'string',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('teste')
    }

}
