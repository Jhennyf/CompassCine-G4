import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";
import AppError from "../../middlewares/AppError";

class ListMovieService {
    public async execute(): Promise<Movie[]> {
        const movieRepository = AppDataSource.getRepository(Movie);
        const movie = await movieRepository.find();
        
        if(movie.length === 0) {
            throw new AppError("There are no films registered.", 404)
        }

        return movie;
    }
}

export default ListMovieService;