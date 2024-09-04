import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Session } from "./Session";

@Entity("tickets")
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: number;

    @Column()
    chair: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Session, (session) => session.ticket)
    session: Session;
}

export default Ticket;
