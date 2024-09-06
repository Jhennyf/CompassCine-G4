import Session from "../../../database/entities/Session";
import { AppDataSource } from "../../../database/";

class SessionService {
    public async getSessionById(id: number): Promise<Session | null> {
        const sessionRepository = AppDataSource.getRepository(Session);
        
        const session = await sessionRepository.findOne({
            where: { id }
        });

        if (!session) {
            throw new Error("Session not found.");
        }

        return session;
    }

    public async getSessions(): Promise<Session[]> {
        const sessionRepository = AppDataSource.getRepository(Session);
        return sessionRepository.find();
    }
}

export default SessionService;