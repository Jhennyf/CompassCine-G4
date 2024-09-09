import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import CreateTicketService from "../../api/services/Ticket/CreateTicketService";
import ShowTicketService from "../../api/services/Ticket/ShowTicketService";
import UpdateTicketService from "../../api/services/Ticket/UpdateTicketService";
import DeleteTicketService from "../../api/services/Ticket/DeleteTicketService";

export class TicketController {
    async post(req: Request, res: Response) {
        try {
            const create = new CreateTicketService();
            const newTicket = await create.execute({
                ...req.body,
                session_id: parseInt(req.params.session_id),
            });
            return res.status(201).json(instanceToInstance(newTicket));
        } catch (error) {
            console.log(error)
            return res.json(error);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const show = new ShowTicketService();
            const ticket = await show.getTicketById(parseInt(id));
            return res.json(ticket);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    async put(req: Request, res: Response) {
        try {
            const { id, session_id } = req.params;
            const update = new UpdateTicketService();
            const updatedTicket = await update.execute({
                id: parseInt(id),
                session_id: parseInt(session_id),
                ...req.body,
            });

            return res.json(instanceToInstance(updatedTicket));
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id, session_id } = req.params;
            const deleteService = new DeleteTicketService();
            await deleteService.execute({
                id: parseInt(id),
                session_id: parseInt(session_id),
            });

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}