import moment from "moment";
import Session from "@database/entities/Session";
import Movie from "@database/entities/Movie";
import { AppDataSource } from "@database/index";
import AppError from "@api/middlewares/AppError";

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

        const movie = await movieRepository.findOne({ where: { id: movie_id } });

        if (!movie) {
            throw new AppError("Movie not found.", 404);
        }

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