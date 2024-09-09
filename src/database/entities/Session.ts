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
<<<<<<< HEAD
import { Exclude, Expose } from "class-transformer";
=======
import { Exclude } from "class-transformer";
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6
import { Movie } from "./Movie";
import { Ticket } from "./Ticket";

@Entity("sessions")
export class Session {
    @PrimaryGeneratedColumn()
    @Expose()
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
<<<<<<< HEAD
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "movie_id" })
=======
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'movie_id' })
    @Exclude()
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6
    movie: Movie;

    @OneToMany(() => Ticket, (ticket) => ticket.session, {
        cascade: true,
<<<<<<< HEAD
        onDelete: "CASCADE",
=======
        onDelete: 'CASCADE',
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6
    })
    ticket: Ticket[];
}

export default Session;
