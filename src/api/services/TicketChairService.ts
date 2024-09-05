import { AppDataSource } from "../../database/index";
import Ticket from "../../database/entities/Ticket";
import Session from "../../database/entities/Session";
import AppError from "@api/middlewares/AppError";

interface IRequest {
    session_id: string;
    chair: string;
}

export class TicketChairService {
    public async execute({ session_id, chair }: IRequest): Promise<void> {
        const ticketRepository = AppDataSource.getRepository(Ticket);
        const sessionRepository = AppDataSource.getRepository(Session);
        // Cadastrar ticket
        //verifica se a sessão existe
        const sessionExists = await this.ticketRepository.findOne(session_id);

        if (!sessionExists) {
            throw new AppError("Sessão inexistente.");
        }

        //verifica a cadeira e mostra as disponiveis caso esteja reservada
        const chairExists = await this.ticketRepository.findOne(chair);
        if (!chairExists) {
            throw new AppError("Cadeira indisponível.");
        }

        // if (chair != null) {
        //     throw new Error("occupied chair");
        // }
        return this.ticketRepository.save(ticket);
    }
}
