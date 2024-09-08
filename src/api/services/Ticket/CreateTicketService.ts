import Ticket from "../../../database/entities/Ticket";
import { AppDataSource } from "../../../database/";
import Session from "../../../database/entities/Session";
import AppError from "../../middlewares/AppError";

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
        console.log("session_id:", session_id);

        if (!sessionMovie) {
            throw new AppError("Sessão nao existe.");
        }

        //conta o numero de tickets na sessão
        const [tickets, ticketCount] = await ticketRepository.findAndCount({
            where: { session: { id: session_id } },
        });
        console.log("ticketCount:", ticketCount);

        //valida se o número de vendas nao excedeu a capacidade
        if (ticketCount > sessionMovie.capacity - 1) {
            throw new AppError("Sold out.");
        }

        //valida as cadeiras
        const chairExists = await ticketRepository.findOne({
            where: { session: { id: session_id }, chair: chair },
        });
        console.log("chair:", chair);

        if (chairExists) {
            throw new AppError("Occupied chair.");
        }
        console.log(chairExists);

        const ticket = ticketRepository.create({
            value,
            chair,
            session: sessionMovie,
        });
        await ticketRepository.save(ticket);

        return ticket;
    }
}

export default CreateTicketService;
