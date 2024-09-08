import moment from "moment";

import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";
import AppError from "../../middlewares/AppError";

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
        const movieRepository = AppDataSource.getRepository(Movie);

        const movie = await movieRepository.findOneBy({ id });
        if (!movie) {
            throw new AppError("Movie is not found.", 404);
        }

        const movieExistsName = await movieRepository.findOneBy({ name });
        if (movieExistsName && name !== movie.name) {
            throw new AppError("The film is already registered", 400);
        }

        if (description.length > 100) {
            throw new AppError("The description cannot exceed 100 characters.", 400);
        }

        movie.name = name;
        movie.description = description;
        movie.actors = actors;
        movie.genre = genre;
        movie.release_date = release_date;

        await movieRepository.save(movie);

        movie.release_date = moment(movie.release_date).format("DD/MM/YYYY HH:mm")

        return movie;
    }
}

export default UpdateMovieService;
