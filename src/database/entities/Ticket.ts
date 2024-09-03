import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("Tickets")
export class Ticket {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    value: number;

    @Column()
    chair: string;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Ticket;