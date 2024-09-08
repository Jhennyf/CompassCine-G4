import Session from "../../../database/entities/Session";
import { AppDataSource } from "../../../database/";

class ShowSessionService {
    public async getSessionById(id: number, movie_id: number): Promise<Session | null> {
        const sessionRepository = AppDataSource.getRepository(Session);
        
        const session = await sessionRepository.findOne({
            where: { id, movie: { id: movie_id } },
            relations: ["movie"]
        });

        if (!session) {
            throw new Error("Session not found.");
        }

        return session;
    }
}

export default ShowSessionService;