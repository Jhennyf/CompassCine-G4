import Ticket from "../../../database/entities/Ticket";
import { AppDataSource } from "../../../database/";

interface IRequest {
    id: number;
    value: number;
    chair: string;
}

class UpdateTicketService {
    public async execute({ id, value, chair }: IRequest): Promise<Ticket | null> {
        const ticketRepository = AppDataSource.getRepository(Ticket);
        
        const ticket = await ticketRepository.findOne({
            where: { id }
        });

        if (!ticket) {
            throw new Error("Ticket not found.");
        }

        const chairExists = await ticketRepository.findOne({
            where: { chair }
        });

        if (chairExists && chairExists.id !== id) {
            throw new Error("Chair already occupied.");
        }

        ticket.value = value;
        ticket.chair = chair;

        await ticketRepository.save(ticket);
    
        return ticket;
    }
}

export default UpdateTicketService;