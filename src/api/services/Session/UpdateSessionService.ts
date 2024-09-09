import moment from "moment";

import Session from "../../../database/entities/Session";
import { AppDataSource } from "../../../database";
import Movie from "../../../database/entities/Movie";
<<<<<<< HEAD

=======
import AppError from "../../middlewares/AppError";
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6

interface IRequest {
    id: number;
    room: string;
    capacity: number;
    day: string;
    time: string;
    movie_id: number;
}

class UpdateSessionService {
    public async execute({ id, room, capacity, day, time, movie_id }: IRequest): Promise<Session | null> {
        const sessionRepository = AppDataSource.getRepository(Session);
        const movieRepository = AppDataSource.getRepository(Movie); 

<<<<<<< HEAD
=======
        const movie = await movieRepository.findOne({ where: { id: movie_id } });

        if (!movie) {
            throw new AppError("Movie not found.", 404);
        }

>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6
        const session = await sessionRepository.findOneBy({ id });
        if (!session) {
            throw new AppError("Session not found.", 404);
        }
        

        const sessionExists = await sessionRepository.findOne({
            where: { day, time, room }
        });

        if (sessionExists && sessionExists.id !== id) {
            throw new AppError("Session already exists.", 400);
        }

<<<<<<< HEAD
        const movie = await movieRepository.findOne({ where: { id: movie_id } });

        if (!movie) {
            throw new Error("Movie not found.");
        }

=======
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6

        session.room = room;
        session.capacity = capacity;
        session.day = day;
        session.time = time;
        session.movie = movie;

        await sessionRepository.save(session);

        session.day = moment(session.day).format("DD/MM/YYYY")

        return session;
    }
}

export default UpdateSessionService;