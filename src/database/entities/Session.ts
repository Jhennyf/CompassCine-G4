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
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    //migation: time stamp with time zone

    @ManyToOne(() => Movie, (movie) => movie.session)
    @JoinColumn({ name: 'movie_id' }) 
    movie: Movie;

    @OneToMany(() => Ticket, (ticket) => ticket.session, {
        cascade: true,
    })
    ticket: Ticket[];
}

export default Session;
