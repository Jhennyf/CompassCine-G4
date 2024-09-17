import moment from "moment";

import Movie from "@database/entities/Movie";
import { AppDataSource } from "@database/index";
import AppError from "@api/middlewares/AppError";

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
        const movieRepository = AppDataSource.getRepository(Movie);

        const movieExists = await movieRepository.findOne({
            where: { name },
        });

        if (movieExists) {
            throw new AppError("Movie already registered.", 400);
        }

        if (description.length > 100) {
            throw new AppError(
                "The description cannot exceed 100 characters.",
                400,
            );
        }

        const movie = movieRepository.create({
            name,
            description,
            actors,
            genre,
            release_date,
        });
        await movieRepository.save(movie);

        movie.release_date = moment(movie.release_date).format("DD/MM/YYYY");

        return movie;
    }
}

export default CreateMovieService;
