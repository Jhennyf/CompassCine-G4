import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Movie } from "./Movie";
import { Ticket } from "./Ticket";

@Entity("sessions")
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    room: string;

    @Column()
    capacity: number;

    @Column()
    day: Date;

    @Column()
    time: string;

    @CreateDateColumn()
    @Exclude()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;
    //migation: time stamp with time zone

    @ManyToOne(() => Movie, (movie) => movie.session, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'movie_id' }) 
    movie: Movie;

    @OneToMany(() => Ticket, (ticket) => ticket.session, {
        cascade: true,
    })
    ticket: Ticket[];
}

export default Session;
