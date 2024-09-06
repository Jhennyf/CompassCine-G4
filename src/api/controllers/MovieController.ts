import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer"

import CreateMovieService from "../services/Movies/CreateMovieService";
import ListMovieService from "../services/Movies/ListMovieService";
import ShowMoviceService from "../services/Movies/ShowMovieService";
import UpdateMovieService from "../services/Movies/UpdateMovieService";
import DeleteMovieService from "../services/Movies/DeleteMovieService";

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

        return res.json(instanceToInstance(movie))
    }
    // List All Movies Controller
    public async list(req: Request, res: Response): Promise <Response> {
        const listMovieService = new ListMovieService();

        const movie = await listMovieService.execute();

        return res.json(movie);
    }
    // Show Movie Controller
    public async show(req: Request, res: Response): Promise <Response> {
        const id = Number(req.params.id);

        const showMovieService = new ShowMoviceService();

        const movie = await showMovieService.execute({ id });

        return res.json(instanceToInstance(movie));
    }
    // Update Movie Controller
    public async update(req: Request, res: Response): Promise <Response> {
        const {name, description, actors, genre, release_date } = req.body;
        const id = Number(req.params.id);

        const updateMovieService = new UpdateMovieService();
        const movie = await updateMovieService.execute({id, name, description, actors, genre, release_date})

        return res.json(instanceToInstance(movie));
    }
    // Delete Movie Controller
    public async delete(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);

        const deleteMovie = new DeleteMovieService();

        await deleteMovie.execute({id});

        return res.status(204).json({});
    }
}
