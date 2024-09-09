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

    @Column({
        type: 'date',
        transformer: {
            from: (value: string) => new Date(value),
            to: (value: Date) => value.toLocaleDateString('pt-BR', { timeZone: 'UTC' }), // format the Date to YYYY-MM-DD
        },
    })
    day: string;

    @Column()
    time: string;

    @Column({ name: "movie_id" })
    movie_id: number;

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
        onDelete: 'CASCADE',
    })
    ticket: Ticket[];
}

export default Session;
