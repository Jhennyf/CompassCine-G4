import { AppDataSource } from "../../database/index";
import Ticket  from "../../database/entities/Ticket";


export class TicketService {
    private ticketRepository = AppDataSource.getRepository(Ticket);
    
    async createTicket(ticket: Ticket) {
        return this.ticketRepository.save(ticket);
    }
    
    async getTicketById(id: number) {
        return this.ticketRepository.findOne(
            { where: { id } }
        );
    }
    
    async getTickets() {
        return this.ticketRepository.find();
    }
    
    async updateTicket(id: number, ticket: Ticket) {
        return this.ticketRepository.update(id, ticket);
    }
    
    async deleteTicket(id: number) {
        return this.ticketRepository.delete(id);
    }
}