import { Request, Response } from "express";
import { instanceToInstance, instanceToPlain } from "class-transformer";

import CreateSessionService from "@api/services/Session/CreateSessionService";
import ShowSessionService from "@api/services/Session/ShowSessionService";
import UpdateSessionService from "@api/services/Session/UpdateSessionService";
import DeleteSessionService from "@api/services/Session/DeleteSessionService";
import ListSessionService from "@api/services/Session/ListSessionsService";

export class SessionController {
    async post(req: Request, res: Response) {
        try {
            const create = new CreateSessionService();
            const newSession = await create.execute({
                ...req.body,
                movie_id: parseInt(req.params.movie_id),
            });
            return res.status(201).json(instanceToInstance(newSession));
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const { movie_id } = req.params;
            const sessions = new ListSessionService();
            const listSession = await sessions.execute(parseInt(movie_id));
            return res.json(instanceToInstance(listSession));
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id, movie_id } = req.params;
            const show = new ShowSessionService();
            const session = await show.getSessionById(
                parseInt(id),
                parseInt(movie_id),
            );
            return res.json(instanceToPlain(session));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return res.status(404).json({ message: "Session not found." });
        }
    }

    async put(req: Request, res: Response) {
        try {
            const { id, movie_id } = req.params;
            const update = new UpdateSessionService();
            const updatedSession = await update.execute({
                id: parseInt(id),
                movie_id: parseInt(movie_id),
                ...req.body,
            });

            return res.json(instanceToInstance(updatedSession));
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id, movie_id } = req.params;
            const deleteService = new DeleteSessionService();
            await deleteService.execute({
                id: parseInt(id),
                movie_id: parseInt(movie_id),
            });

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}