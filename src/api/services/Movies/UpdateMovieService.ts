import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";
import AppError from "../../middlewares/AppError";
import { getCustomRepository } from "typeorm";
import MoviesRepository from "@api/repositories/MoviesRepository";

interface IRequest {
    id: number;
    name: string;
    description: string;
    actors: string[];
    genre: string;
    release_date: string;
}

class UpdateMovieService {
    public async execute({
        id,
        name,
        description,
        actors,
        genre,
        release_date,
    }: IRequest): Promise<Movie | null> {
        const movieRepository = getCustomRepository(MoviesRepository);

        const movie = await movieRepository.findById(id);
        if (!movie) {
            throw new AppError("Movie is not found.");
        }

        const movieExistsName = await movieRepository.findByName(name);
        if (movieExistsName && name !== movie.name) {
            throw new AppError("Movie is already.");
        }

        if (description.length > 100) {
            throw new AppError("The description cannot exceed 100 characters.");
        }

        movie.name = name;
        movie.description = description;
        movie.actors = actors;
        movie.genre = genre;
        movie.release_date = release_date;

        await movieRepository.save(movie);

        return movie;
    }
}

export default UpdateMovieService;
