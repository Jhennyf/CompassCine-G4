import { Request, Response } from "express";
import { AppDataSource } from "../../database/index";
import { Session } from "@database/entities/Session";


export class SectionController {
    private sessionRepository = AppDataSource.getRepository(Session);
    
    async getAll(req: Request, res: Response) {
        const sessions = await this.sessionRepository.find({
            relations: ["movie"],
        });
        return res.json(sessions);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const sessions = await this.sessionRepository.findOne({ where: { id: parseInt(id) }, relations: ["movie"] });
        if (sessions) {
            return res.json(sessions);
        }
        return res.status(404).json({ message: "session not found." });
    }
    async post(req: Request, res: Response) {
        const newSession = this.sessionRepository.create(req.body);
        await this.sessionRepository.save(newSession);
        return res.status(201).json(newSession);
    }

    async put(req: Request, res: Response) {
        const { id } = req.params;
        const sessions = await this.sessionRepository.findOneBy({
            id: parseInt(id),
        });

        if (sessions) {
            this.sessionRepository.merge(sessions, req.body);
            const result = await this.sessionRepository.save(sessions);
            return res.json(result);
        }
        return res.status(404).json({ message: "session not found." });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.sessionRepository.delete(id);
        if (result.affected) {
            return res.status(204).send();
        }
        return res.status(404).json({ message: "session not fund." });
    }
}
