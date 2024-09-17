import moment from "moment";

import Movie from "@database/entities/Movie";
import { AppDataSource } from "@database/index";
import AppError from "@api/middlewares/AppError";

interface IParams {
    id: number;
}

interface ISession {
    id: number;
    movie_id: number;
    room: string;
    capacity: number;
    day: string;
    time: string;
}
interface ITicket {
    id: string;
    quantity: number;
}

interface IRequest {
    ticket: ITicket[];
    movie: ISession[];
}

class ShowMoviceService {
    public async execute({ id }: IParams): Promise<Movie | null> {
        const movieRepository = AppDataSource.getRepository(Movie);

        const movie = await movieRepository.findOne({
            where: { id },
            relations: ["session", "session.ticket"],
        });

        if (!movie) {
            throw new AppError("Movie not found.", 404);
        }

        movie.release_date = moment(movie.release_date).format("DD/MM/YYYY");

        for (let i = 0; i < movie.session.length; i++) {
            movie.session[i].day = moment(
                new Date(movie.session[0].day),
            ).format("DD/MM/YYYY");
        }

        return movie;
    }
}

export default ShowMoviceService;
