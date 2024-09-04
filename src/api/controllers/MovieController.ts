import { Request, Response } from "express";
import { AppDataSource } from "@database";
import { Movie } from "@database/entities/Movie";

export class MovieController {
    private movieRepository = AppDataSource.getRepository(Movie);

    async getAll(req: Request, res: Response) {
        const movies = await this.movieRepository.find();
        return res.json(movies);
    }

    async post(req: Request, res: Response) {
        const newMovie = this.movieRepository.post(req.body);
        await this.movieRepository.save(newMovie);
        return res.status(201).json(newMovie);
    }

    async put(req: Request, res: Response) {
        const { id } = req.params;
        const movie = await this.movieRepository.findOneBy({
            id: parseInt(id),
        });

        if (movie) {
            this.movieRepository.merge(movie, req.body);
            const result = await this.movieRepository.save(movie);
            return res.json(result);
        }
        return res.status(404).json({ message: "Não encontrado" });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.movieRepository.delete(id);
        if (result.affected) {
            return res.status(204).send();
        }
        return res.status(404).json({ message: "Filme não encontrado" });
    }
}
