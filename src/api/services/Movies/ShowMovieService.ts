import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";
import AppError from "../../middlewares/AppError";
import { getCustomRepository } from "typeorm";
import MoviesRepository from "@api/repositories/MoviesRepository";

interface IParams {
    id: number;
}

class ShowMoviceService {
    public async execute({ id }: IParams): Promise<Movie | null> {
        const movieRepository = getCustomRepository(MoviesRepository);

        const movie = await movieRepository.findById(id);

        if (!movie) {
            throw new AppError("Movie not found.");
        }

        return movie;
    }
}

export default ShowMoviceService;
