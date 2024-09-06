import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";
import AppError from "../../middlewares/AppError";
import { getCustomRepository } from "typeorm";
import MoviesRepository from "@api/repositories/MoviesRepository";

interface IRequest {
    name: string;
    description: string;
    actors: string[];
    genre: string;
    release_date: string;
}

class CreateMovieService {
    public async execute({
        name,
        description,
        actors,
        genre,
        release_date,
    }: IRequest): Promise<Movie> {
        const movieRepository = getCustomRepository(MoviesRepository);

        const movieExists = await movieRepository.findByName(name);

        if (movieExists) {
            throw new AppError("Movie already registered.");
        }

        if (description.length > 100) {
            throw new AppError("The description cannot exceed 100 characters.");
        }

        const movie = movieRepository.create({
            name,
            description,
            actors,
            genre,
            release_date,
        });
        await movieRepository.save(movie);
        return movie;
    }
}

export default CreateMovieService;
