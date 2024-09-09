import Ticket from "../../../database/entities/Ticket";
import Session from "../../../database/entities/Session";
import Movie from "../../../database/entities/Movie";

import AppError from "../../middlewares/AppError";
import { AppDataSource } from "../../../database/";

interface IRequest {
    id: number;
    session_id: number;
    movie_id: number;
    value: number;
    chair: string;
}

class UpdateTicketService {
    public async execute({ id, value, chair, session_id, movie_id }: IRequest): Promise<Ticket | null> {
        const ticketRepository = AppDataSource.getRepository(Ticket);
        const sessionRepository = AppDataSource.getRepository(Session);
        const movieRepository = AppDataSource.getRepository(Movie);

        const movieExists = await movieRepository.findOne({
            where: {id: movie_id}
        });

        if(!movieExists) {
            throw new AppError("Movie not found", 404)
        }

        const sessionMovie = await sessionRepository.findOne({
            where: { id: session_id},
        });

        if (!sessionMovie) {
            throw new AppError("Session not found.", 404);
        }

        const ticket = await ticketRepository.findOne({
            where: { id }
        });

        if (!ticket) {
            throw new AppError("Ticket not found.", 404);
        }

        const chairExists = await ticketRepository.findOne({
            where: { chair }
        });

        if (chairExists && chairExists.id !== id) {
            throw new AppError("Chair already occupied.", 400);
        }

        ticket.value = value;
        ticket.chair = chair;

        await ticketRepository.save(ticket);
    
        return ticket;
    }
}

export default UpdateTicketService;