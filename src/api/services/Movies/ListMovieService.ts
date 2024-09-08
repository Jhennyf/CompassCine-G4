import moment from "moment";

import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";
import AppError from "../../middlewares/AppError";

class ListMovieService {
    public async execute(): Promise<Movie[]> {
        const movieRepository = AppDataSource.getRepository(Movie);
        const movie = await movieRepository.find({});
        
        if(movie.length === 0) {
            throw new AppError("There are no films registered.", 404)
        }

        for (let i = 0; i < movie.length; i++) {
            movie[i].release_date = moment(movie[i].release_date).format("DD/MM/YYYY HH:mm")
        }

        return movie;
    }
}

export default ListMovieService;