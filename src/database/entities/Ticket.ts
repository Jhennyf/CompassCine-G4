import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
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
    @Exclude()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;

    @ManyToOne(() => Session, (session) => session.ticket)
    session: Session;
}

export default Ticket;
