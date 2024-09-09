import Ticket from "../../../database/entities/Ticket";
import { AppDataSource } from "../../../database/";

class TicketService {
    private ticketRepository = AppDataSource.getRepository(Ticket);

    public async getTicketById(id: number): Promise<Ticket | null> {
        const ticket = await this.ticketRepository.findOne({
            where: { id },
            relations: ["session"],
        });

        if (!ticket) {
            throw new Error("Ticket not found.");
        }

        return ticket;
    }

    public async getTickets(): Promise<Ticket[]> {
        return this.ticketRepository.find();
    }
}

export default TicketService;
