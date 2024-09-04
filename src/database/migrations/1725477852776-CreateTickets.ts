import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTickets1725477852776 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tickets",
                columns: [
                    {
                        name: "id",
                        type: "number",
                        isPrimary: true,
                    },
                    {
                        name: "value",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "chair",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp with time zone",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp with time zone",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                      name: 'TokenUser',
                      referencedTableName: 'sessions',
                      referencedColumnNames: ['id'],
                      columnNames: ['session_id'],
                      onDelete: 'CASCADE',
                      onUpdate: 'CASCADE',
                    },
                  ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tickets");
    }
}
