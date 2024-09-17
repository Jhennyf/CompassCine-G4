import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
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

    @Column({ name: "sessionId" })
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
    @JoinColumn({ name: "sessionId" })
    session: Session;
}

export default Ticket;
