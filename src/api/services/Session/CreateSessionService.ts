import moment from "moment";
import Session from "@database/entities/Session";
import Movie from "@database/entities/Movie";
import { AppDataSource } from "@database/index";
import AppError from "@api/middlewares/AppError";

interface IRequest {
    room: string;
    capacity: number;
    day: string;
    time: string;
    movie_id: number;
}

class CreateSessionService {
    public async execute({ room, capacity, day, time, movie_id }: IRequest): Promise<Session> {
        const sessionRepository = AppDataSource.getRepository(Session);
        const movieRepository = AppDataSource.getRepository(Movie); 

        const movie = await movieRepository.findOne({ where: { id: movie_id } });

        if (!movie) {
            throw new AppError("Movie not found.", 404);
        }

        const sessionExists = await sessionRepository.findOne({
            where: { day, time, room }
        });

        if (sessionExists) {
            throw new AppError("Session already registered.", 400);
        }

        

        const session = sessionRepository.create({ room, capacity, day, time, movie });
        await sessionRepository.save(session);

        session.day = moment(session.day).format("DD/MM/YYYY")

        return session;
    }
}

export default CreateSessionService;