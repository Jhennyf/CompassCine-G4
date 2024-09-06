import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";
import AppError from "../../middlewares/AppError";
import { getCustomRepository } from "typeorm";
import MoviesRepository from "@api/repositories/MoviesRepository";

class ListMovieService {
    public async execute(): Promise<Movie[]> {
        const movieRepository = getCustomRepository(MoviesRepository);
        const movie = await movieRepository.find();

        if (movie.length === 0) {
            throw new AppError("There are no films registered.");
        }

        return movie;
    }
}

export default ListMovieService;
