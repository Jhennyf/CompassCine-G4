import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from "typeorm";
import { Session } from "./Session";
import { Exclude } from "class-transformer";

@Entity("tickets")
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: number;

    @Column()
    chair: string;

    @Column({ name: "session_id" })
    session_id: number;

    @CreateDateColumn()
    @Exclude()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;

    @ManyToOne(() => Session, (session) => session.ticket, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "session_id" })
    session: Session;
}

export default Ticket;
