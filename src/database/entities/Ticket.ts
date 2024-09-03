import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, Unique} from "typeorm";
import { Session } from "./Session";

@Entity("tickets")
@Unique(["chair", "sessionId"])
export class Ticket {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    value: number;

    @Column()
    chair: string;
    
    @Column()
    sessionId: string; 

    @OneToMany(() => Session, session => session.tickets)
    @JoinColumn({ name: "sessionId" })
    session: Session;
}

export default Ticket;