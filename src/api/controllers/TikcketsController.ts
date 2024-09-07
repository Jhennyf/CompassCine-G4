import { Request, Response } from "express";
import { AppDataSource } from "../../database/index";
import { Ticket } from "../../database/entities/Ticket";

export class TicketController {
    private ticketRepository = AppDataSource.getRepository(Ticket);

    async getAll(req: Request, res: Response) {
        const tickets = await this.ticketRepository.find({
            relations: ["section"],
        });
        return res.json(tickets);
    }

    async getId(req: Request, res: Response) {
        const { id } = req.params;
        const ticket = await this.ticketRepository.findOne({
            where: { id: parseInt(id) },
            relations: ["section"],
        });
        if (ticket) {
            return res.json(ticket);
        }
        return res.status(404).json({ message: "ticket not found" });
    }

    async post(req: Request, res: Response) {
        const newTicket = this.ticketRepository.create(req.body);
        await this.ticketRepository.save(newTicket);
        return res.status(201).json(newTicket);
    }

    async put(req: Request, res: Response) {
        const { id } = req.params;
        const ticket = await this.ticketRepository.findOneBy({
            id: parseInt(id),
        });

        if (ticket) {
            this.ticketRepository.merge(ticket, req.body);
            const result = await this.ticketRepository.save(ticket);
            return res.json(result);
        }
        return res.status(404).json({ message: "ticket not found" });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.ticketRepository.delete(id);
        return result.affected
            ? res.status(204).send()
            : res.status(404).json({ message: "ticket not found" });
    }
}
