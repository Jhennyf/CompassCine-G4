import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from "typeorm";

export class AddMovieIdToCreateSession1725481363414
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "sessions",
            new TableColumn({
                name: "movie_id",
                type: "int",
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            "sessions",
            new TableForeignKey({
                name: "SessionsMovie",
                columnNames: ["movie_id"],
                referencedTableName: "movies",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("sessions", "SessionsMovie");
        await queryRunner.dropColumn("sessions", "movie_id");
    }
}
