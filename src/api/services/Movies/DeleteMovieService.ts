import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";
import { getCustomRepository } from "typeorm";
import MoviesRepository from "@api/repositories/MoviesRepository";

interface IParams {
    id: number;
}

class DeleteMovieService {
    public async execute({ id }: IParams): Promise<void> {
        const movieRepository = getCustomRepository(MoviesRepository);

        const movie = await movieRepository.findById(id);

        if (!movie) {
            throw new Error("Movie is not found.");
        }

        await movieRepository.remove(movie);
    }
}

export default DeleteMovieService;
