import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("sessions")
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    room: string;

    @Column()
    capacity: number;

    @Column()
    day: Date;

    @Column()
    time: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    //migation: time stamp with time zone
}

export default Session;
