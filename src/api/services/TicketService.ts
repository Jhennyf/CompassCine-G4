import { AppDataSource } from "../../database/index";
import Ticket from "../../database/entities/Ticket";

export class TicketService {
    private ticketRepository = AppDataSource.getRepository(Ticket);
    // Cadastrar ticket
    async createTicket(ticket: Ticket) {
        try {
            const chair = await this.ticketRepository.findOne({
                where: { chair: ticket.chair },
            });
            if (chair != null) {
                throw new Error("occupied chair");
            }
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
