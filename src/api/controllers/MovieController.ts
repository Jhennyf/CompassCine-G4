import { Request, Response } from "express";

import CreateMovieService from "../services/Movies/CreateMovieService";

export default class MovieController {
    // Creation Movie Controller
    public async create(req: Request, res: Response): Promise <Response> {
        const {name, description, actors, genre, release_date } = req.body;

        const movieService = new CreateMovieService();
        const movie = await movieService.execute({
            name,
            description,
            actors,
            genre,
            release_date 
        });

        return res.json(movie)
    }
    // List All Movies Controller
    public async list(req: Request, res: Response): Promise <Response> {
        
    }
}
