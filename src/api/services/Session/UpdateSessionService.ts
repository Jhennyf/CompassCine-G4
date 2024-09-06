import Session from "../../../database/entities/Session";
import { AppDataSource } from "../../../database";

interface IRequest {
    id: number;
    room: string;
    capacity: number;
    day: Date;
    time: string;
}

class UpdateSessionService {
    public async execute({ id, room, capacity, day, time }: IRequest): Promise<Session | null> {
        const sessionRepository = AppDataSource.getRepository(Session);
        
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

        session.room = room;
        session.capacity = capacity;
        session.day = day;
        session.time = time;

        await sessionRepository.save(session);
    
        return session;
    }
}

export default UpdateSessionService;