import moment from "moment";

import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";
import AppError from "../../middlewares/AppError";

interface IParams {
    id: number;
}

class ShowMoviceService {
    public async execute({ id }: IParams): Promise<Movie | null> {
        const movieRepository = AppDataSource.getRepository(Movie);
    
        const movie = await movieRepository.findOne({
            where: {id},
            relations: ["session"]
        });

        if(!movie) {
            throw new AppError("Movie not found.", 404)
        }
    
        movie.release_date = moment(movie.release_date).format("DD/MM/YYYY HH:mm")
        
        return movie;
    }
}

export default ShowMoviceService;