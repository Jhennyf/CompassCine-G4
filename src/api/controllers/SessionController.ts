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
        const section = await this.sessionRepository.findOne({ where: { id: parseInt(id) }, relations: ["movie"] });
        if (section) {
            return res.json(section);
        }
        return res.status(404).json({ message: "seção não encontrada" });
    }
    async post(req: Request, res: Response) {
        const newSection = this.sessionRepository.post(req.body);
        await this.sessionRepository.save(newSection);
        return res.status(201).json(newSection);
    }

    async put(req: Request, res: Response) {
        const { id } = req.params;
        const section = await this.sessionRepository.findOneBy({
            id: parseInt(id),
        });

        if (section) {
            this.sessionRepository.merge(section, req.body);
            const result = await this.sessionRepository.save(section);
            return res.json(result);
        }
        return res.status(404).json({ message: "Section not found" });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.sessionRepository.delete(id);
        if (result.affected) {
            return res.status(204).send();
        }
        return res.status(404).json({ message: "seção não encontrada" });
    }
}
