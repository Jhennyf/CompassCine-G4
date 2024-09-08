import Session from "../../../database/entities/Session";
import { AppDataSource } from "../../../database";
import Movie from "../../../database/entities/Movie";


interface IRequest {
    id: number;
    room: string;
    capacity: number;
    day: Date;
    time: string;
    movie_id: number;
}

class UpdateSessionService {
    public async execute({ id, room, capacity, day, time, movie_id }: IRequest): Promise<Session | null> {
        const sessionRepository = AppDataSource.getRepository(Session);
        const movieRepository = AppDataSource.getRepository(Movie); 

        const session = await sessionRepository.findOneBy({ id });
        if (!session) {
            throw new Error("Session not found.");
        }

        const sessionExists = await sessionRepository.findOne({
            where: { day, time, room }
        });

        if (sessionExists && sessionExists.id !== id) {
            throw new Error("Session already exists.");
        }

        const movie = await movieRepository.findOne({ where: { id: movie_id } });

        if (!movie) {
            throw new Error("Movie not found.");
        }


        session.room = room;
        session.capacity = capacity;
        session.day = day;
        session.time = time;
        session.movie = movie;

        await sessionRepository.save(session);
    
        return session;
    }
}

export default UpdateSessionService;