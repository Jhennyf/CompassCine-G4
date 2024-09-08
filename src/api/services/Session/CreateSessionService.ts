import Session from "../../../database/entities/Session";
import { AppDataSource } from "../../../database/";
import Movie from "../../../database/entities/Movie";
import AppError from "../../middlewares/AppError";

interface IRequest {
    room: string;
    capacity: number;
    day: Date;
    time: string;
    movie_id: number;
}

class CreateSessionService {
    public async execute({ room, capacity, day, time, movie_id }: IRequest): Promise<Session> {
        const sessionRepository = AppDataSource.getRepository(Session);
        const movieRepository = AppDataSource.getRepository(Movie); 

        const sessionExists = await sessionRepository.findOne({
            where: { day, time, room }
        });

        if (sessionExists) {
            throw new AppError("Session already registered.", 400);
        }

        const movie = await movieRepository.findOne({ where: { id: movie_id } });

        if (!movie) {
            throw new AppError("Movie not found.", 404);
        }

        const session = sessionRepository.create({ room, capacity, day, time, movie });
        await sessionRepository.save(session);

        return session;
    }
}

export default CreateSessionService;