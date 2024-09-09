import moment from "moment";

import Movie from "@database/entities/Movie";
import Session from "@database/entities/Session";

import { AppDataSource } from "@database/index";
import AppError from "@api/middlewares/AppError";

class ListMovieService {
    public async execute(): Promise<Movie[] | Session[]> {
        const movieRepository = AppDataSource.getRepository(Movie);
<<<<<<< HEAD
        const movie = await movieRepository.find();

        if (movie.length === 0) {
            throw new AppError("There are no films registered.");
=======

        const movie = await movieRepository.find({
            relations: ["session", "session.ticket"],
            
        });
        
        if (movie.length === 0) {
            throw new AppError("There are no films registered.", 404)
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6
        }

        for (let i = 0; i < movie.length; i++) {
            movie[i].release_date = moment(movie[i].release_date).format("DD/MM/YYYY ");
            for (let j = 0; j < movie[i].session.length; j++) {
                movie[i].session[j].day = moment(movie[i].session[j].day).format("DD/MM/YYYY");
            }
        }
        
        return movie;
    }
}

export default ListMovieService;
