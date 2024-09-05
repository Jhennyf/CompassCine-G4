// interface IChair {
//     movie_id: string;
//     session_id: string;
//   }

// interface IRequest {
//     value: number;
//     chair: string;
//   }

// export class TicketService {
//     const ticketRepository = AppDataSource.getRepository(Ticket);
//     const sessionRepository = AppDataSource.getRepository(Session);
//  //Verifica a sessão

//  const sessionExists = await sessionRepository.findById(session_id);

//  if (!sessionExists) {
//    throw new AppError('Sessão inexistente.');
//  }
//  //verifica a cadeira e mostra as disponiveis caso esteja reservada
//  const chairExists = await ticketRepository.findById(chair);

//  //verificar se tem cliente no id informado
//  if (!chairExists) {
//    throw new AppError('Cadeira indisponível.');
//  }
//  //salva a reserva


// }

import { AppDataSource } from "../../database/index";
import Ticket  from "../../database/entities/Ticket";
import Session from "../../database/entities/Session"
import AppError from "@api/middlewares/AppError";

export class TicketService {
    private ticketRepository = AppDataSource.getRepository(Ticket);
    private sessionRepository = AppDataSource.getRepository(Session);
    // Cadastrar ticket
    async createTicket(ticket: Ticket) {
        try {
            //verifica se a sessão existe
            const sessionExists = await this.ticketRepository.findOne({
                where: { id },
                relations: ["session"],,
            });

            if (!sessionExists) {
              throw new AppError('Sessão inexistente.');}

            //verifica a cadeira e mostra as disponiveis caso esteja reservada
            const chairExists = await this.ticketRepository.findById({
               wrhere: {chair},
               });
               if (!chairExists) {
                throw new AppError('Cadeira indisponível.');
              }

            // if (chair != null) {
            //     throw new Error("occupied chair");
            // }
            return this.ticketRepository.save(ticket);
        } catch (error) {
            return error;
        }
    }

    // Buscar ticket por id
    async getTicketById(id: number) {
        const ticket = await this.ticketRepository.findOne({
            where: { id },
            relations: ["session"],
        });

        if (ticket == null) {
            throw new Error("Ticket not found");
        }
        return ticket;
    }

    // Buscar todos os tickets
    async getTickets() {
        return this.ticketRepository.find();
    }

    async updateTicket(id: number, ticket: Ticket) {
        return this.ticketRepository.update(id, ticket);
    }

    // Deletar ticket
    async deleteTicket(id: number) {
        return this.ticketRepository.delete(id);
    }
}
