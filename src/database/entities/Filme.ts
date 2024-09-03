import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("filmes")
export class Filme {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;
}
