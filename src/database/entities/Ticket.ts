import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Session } from "./Session";

@Entity("Tickets")
export class Ticket {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    value: number;

    @Column()
    chair: string;

    @ManyToOne(() => Session, (session) => session.ticket)
    session: Session;
}

export default Ticket;
