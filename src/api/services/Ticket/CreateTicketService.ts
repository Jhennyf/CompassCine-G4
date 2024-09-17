import Ticket from "@database/entities/Ticket";
import Session from "@database/entities/Session";
import { AppDataSource } from "@database/index";
import AppError from "@api/middlewares/AppError";

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

        //valida a sessão
        const sessionMovie = await sessionRepository.findOne({
            where: { id: session_id },
        });

        if (!sessionMovie) {
            throw new AppError("Session not found.", 404);
        }

        //conta o numero de tickets na sessão

        const [tickets, ticketCount] = await ticketRepository.findAndCount({
            where: { session: { id: session_id } },
        });
        console.log(tickets);

        //valida se o número de vendas nao excedeu a capacidade
        if (ticketCount > sessionMovie.capacity - 1) {
            throw new AppError("Sold out.", 400);
        }

        //valida as cadeiras
        const chairExists = await ticketRepository.findOne({
            where: { session: { id: session_id }, chair: chair },
        });
        console.log("chair:", chair);

        if (chairExists) {
            throw new AppError(`Occupied chair: ${chair}.`, 400);
        }
        console.log(chairExists);

        const ticket = ticketRepository.create({
            value,
            chair,
            session_id,
        });
        await ticketRepository.save(ticket);

        return ticket;
    }
}

export default CreateTicketService;
