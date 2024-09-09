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
<<<<<<< HEAD
            where: { id },
            relations: ["session"],
        });

        if (!movie) {
            throw new AppError("Movie not found.");
        }
=======
            where: {id},
            relations: ["session", "session.ticket"],
        });

        if(!movie) {
            throw new AppError("Movie not found.", 404)
        }
    
        
        movie.release_date = moment(movie.release_date).format("DD/MM/YYYY")
        console.log(movie.session.length)

        for (let i =0; i < movie.session.length; i++) {
            movie.session[i].day = moment(movie.session[0].day).format("DD/MM/YYYY")
        }

        // movie.session[0].day = moment(movie.session[0].day).format("DD/MM/YYYY")
        
      
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6

        return movie;
    }
}

export default ShowMoviceService;
