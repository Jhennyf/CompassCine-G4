import { EntityRepository, Repository } from "typeorm";
import Ticket from "@database/entities/Ticket";

@EntityRepository(Ticket)
class TicketsRepository extends Repository<Ticket> {
    public async findById(id: number): Promise<Ticket | null> {
        const ticket = await this.findOne({
            where: {
                id,
            },
        });

        return ticket;
    }

    public async findByChair(chair: string): Promise<Ticket | null> {
        const ticket = await this.findOne({
            where: {
                chair,
            },
        });

        return ticket;
    }
}

export default TicketsRepository;
