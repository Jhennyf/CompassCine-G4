import Session from "../../../database/entities/Session";
import { AppDataSource } from "../../../database/";

interface IRequest {
    room: string;
    capacity: number;
    day: Date;
    time: string;
}

class CreateSessionService {
    public async execute({ room, capacity, day, time }: IRequest): Promise<Session> {
        const sessionRepository = AppDataSource.getRepository(Session);

        const sessionExists = await sessionRepository.findOne({
            where: { day, time, room }
        });

        if (sessionExists) {
            throw new Error("Session already registered.");
        }

        const session = sessionRepository.create({ room, capacity, day, time });
        await sessionRepository.save(session);

        return session;
    }
}

export default CreateSessionService;