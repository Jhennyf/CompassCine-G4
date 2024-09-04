import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from "typeorm";

export class AddSessionIdToCreateTicket1725481344380
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "tickets",
            new TableColumn({
                name: "session_id",
                type: "number",
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            "tickets",
            new TableForeignKey({
                name: "TicketsSession",
                columnNames: ["session_id"],
                referencedTableName: "sessions",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("tickets", "SessionsTickets");
        await queryRunner.dropColumn("tickets", "session_id");
    }
}
