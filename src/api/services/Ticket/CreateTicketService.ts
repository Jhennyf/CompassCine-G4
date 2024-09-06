import Ticket from "../../../database/entities/Ticket";
import { AppDataSource } from "../../../database/";

interface IRequest {
    value: number;
    chair: string;
}

class CreateTicketService {
    public async execute({ value, chair }: IRequest): Promise<Ticket> {
        const ticketRepository = AppDataSource.getRepository(Ticket);

        const chairExists = await ticketRepository.findOne({
            where: { chair }
        });

        if (chairExists) {
            throw new Error("Occupied chair.");
        }

        const ticket = ticketRepository.create({ value, chair });
        await ticketRepository.save(ticket);

        return ticket;
    }
}

export default CreateTicketService;
