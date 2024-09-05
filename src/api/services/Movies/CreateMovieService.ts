import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";

interface IRequest {
    name: string;
    description: string;
    actors: string[];
    genre: string;
    release_date: string;
}

class CreateMovieService {
    public async execute({ name, description, actors, genre, release_date }: IRequest): Promise<Movie> {
        const movieRepository = AppDataSource.getRepository(Movie);

        const movieExists = await movieRepository.findOne({
            where: { name }
        });

        if (movieExists) {
            throw new Error("Filme já cadastrado")
        }

        if (description.length > 100) {
            throw new Error("Caracteres superior a 100")
        }

        const movie = movieRepository.create({ name, description, actors, genre, release_date });
        await movieRepository.save(movie)

        return movie;
    }
}

export default CreateMovieService;