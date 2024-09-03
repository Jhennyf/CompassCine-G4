import { Request, Response } from "express";
import { AppDataSource } from "../database";


export class SectionController {
    private sectionRepository = AppDataSource.getRepository(Section);

    async getAll(req: Request, res: Response) {
        const sections = await this.sectionRepository.find({ relations: ["movie"] });
        return res.json(sections);
    }

    async post(req: Request, res: Response) {
        const newSection = this.sectionRepository.post(req.body);
        await this.sectionRepository.save(newSection);
        return res.status(201).json(newSection);
    }

    async put(req: Request, res: Response) {
        const { id } = req.params;
        const section = await this.sectionRepository.findOneBy({ id: parseInt(id) });

        if (section) {
            this.sectionRepository.merge(section, req.body);
            const result = await this.sectionRepository.save(section);
            return res.json(result);
        }
        return res.status(404).json({ message: "Section not found" });
    }
    
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.sectionRepository.delete(id);
        if (result.affected) {
            return res.status(204).send();
          } 
          return res.status(404).json({ message: "seção não encontrada" });
    }
}