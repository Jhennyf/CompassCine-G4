import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("movies")
export class Movie {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @Column()
    actors: string;

    @Column()
    genre: string;

    @Column()
    release_date: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    //migation: time stamp with time zone
}

export default Movie;