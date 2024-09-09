import moment from "moment";

import Movie from "@database/entities/Movie";
import { AppDataSource } from "@database/index";
import AppError from "@api/middlewares/AppError";

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

        for (let i =0; i < movie.session.length; i++) {
            movie.session[i].day = moment(new Date(movie.session[0].day)).format("DD/MM/YYYY")
        }

<<<<<<< HEAD
        // movie.session[0].day = moment(movie.session[0].day).format("DD/MM/YYYY")
        
      
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6

=======
>>>>>>> 33f9598a49405c89914e1b33b3e26262ff57c599
        return movie;
    }
}

export default ShowMoviceService;
