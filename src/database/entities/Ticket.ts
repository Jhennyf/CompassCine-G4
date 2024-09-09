import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
<<<<<<< HEAD
    JoinColumn,
=======
    JoinColumn
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6
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
<<<<<<< HEAD
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "session_id" })
=======
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name:
        "sessionId"
        })
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6
    session: Session;
}

export default Ticket;
