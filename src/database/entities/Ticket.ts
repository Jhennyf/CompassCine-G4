import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Tickets")
export class Ticket {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    value: number;

    @Column()
    chair: string;
  
}

export default Ticket;