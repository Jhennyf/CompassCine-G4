import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Session } from "./Session";
import { Exclude } from "class-transformer";

@Entity("movies")
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({type: "simple-array"})
    actors: string[];

    @Column()
    genre: string;

    @Column()
    release_date: string;

    @CreateDateColumn()
    @Exclude()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;
    //migation: time stamp with time zone

    @OneToMany(() => Session, (session) => session.movie, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    session: Session[];
}

export default Movie;
