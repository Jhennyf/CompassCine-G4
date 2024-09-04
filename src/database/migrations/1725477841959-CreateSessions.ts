import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSessions1725477841959 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sessions",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "room",
                        type: "varchar",
                    },
                    {
                        name: "capacity",
                        type: "int",
                    },
                    {
                        name: "day",
                        type: "date",
                    },
                    {
                        name: "time",
                        type: "time",
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
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sessions");
    }
}
