import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";

class ListMovieService {
    public async execute(): Promise<Movie[]> {
        const movieRepository = AppDataSource.getRepository(Movie);
        const movie = await movieRepository.find();

        return movie;
    }
}

export default ListMovieService;