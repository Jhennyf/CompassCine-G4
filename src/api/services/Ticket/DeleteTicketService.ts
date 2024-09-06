import Ticket from "@database/entities/Ticket";
import { AppDataSource } from "../../../database/";

interface IParams {
    id: number;
}

class DeleteTicketService {
    public async execute({ id }: IParams): Promise<void> {
        const ticketRepository = AppDataSource.getRepository(Ticket);

        const ticket = await ticketRepository.findOne({
            where: { id }
        });

        if (!ticket) {
            throw new Error("Ticket not found.");
        }

        await ticketRepository.remove(ticket);
    }
}

export default DeleteTicketService;