import { AppDataSource } from "../../database/index";
import Ticket  from "../../database/entities/Ticket";


export class TicketService {
    private ticketRepository = AppDataSource.getRepository(Ticket);
    
    async createTicket(ticket: Ticket) {
        
        try {
            return this.ticketRepository.save(ticket);
        } catch (error) {   
            return error;
        }
    }
    
    async getTicketById(id: number) {
        const ticket = await this.ticketRepository.findOne(
            { where: { id } }
        );
        if (ticket == null) {
            throw new Error("Ticket not found");
        }

        return ticket; 
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