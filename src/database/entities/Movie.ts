import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Session } from "./Session";

@Entity("movies")
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

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

    @OneToMany(() => Session, (session) => session.movie, {
        cascade: true,
    })
    session: Session[];
}

export default Movie;
