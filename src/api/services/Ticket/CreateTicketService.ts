import Ticket from "../../../database/entities/Ticket";
import { AppDataSource } from "../../../database/";
import Session from "@database/entities/Session";

interface IRequest {
    value: number;
    chair: string;
}

class CreateTicketService {
    public async execute({ value, chair }: IRequest): Promise<Ticket> {
        const ticketRepository = AppDataSource.getRepository(Ticket);
        const sessionRepository = AppDataSource.getRepository(Session);

        const [chairCount] = await ticketRepository.findAndCount(chair)

        if(chairCount > sessionRepository.capacity){
            throw new Error("Sold out.");
        }

        const chairExists = await ticketRepository.findOne({
            where: { chair }
        });

        if (chairExists === true) {
            throw new Error("Occupied chair.");
        }

        const ticket = ticketRepository.create({ value, chair });
        await ticketRepository.save(ticket);

        return ticket;
    }
}

export default CreateTicketService;
