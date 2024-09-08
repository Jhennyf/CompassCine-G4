import Ticket from "../../../database/entities/Ticket";
import { AppDataSource } from "../../../database/";
import Session from "@database/entities/Session";

interface IRequest {
    value: number;
    chair: string;
    session_id: number;
}

class CreateTicketService {
    public async execute({
        value,
        chair,
        session_id,
    }: IRequest): Promise<Ticket> {
        const ticketRepository = AppDataSource.getRepository(Ticket);
        const sessionRepository = AppDataSource.getRepository(Session);

        const sessionMovie = await sessionRepository.findOne({
            where: { capacity: session_id },
        });

        if (!sessionMovie) {
            throw new Error("Sessão nao existe.");
        }

        const [tickets, ticketCount] = await ticketRepository.findAndCount({
            where: { session: { id: session_id } },
        });

        if (ticketCount > sessionMovie.capacity) {
            throw new Error("Sold out.");
        }

        //valida as cadeiras
        const chairExists = await ticketRepository.findOne({
            where: { chair },
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
