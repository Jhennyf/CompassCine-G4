import Session from "@database/entities/Session";
import { AppDataSource } from "@database/index";
import AppError from "@api/middlewares/AppError";

class ListSessionService {
    public async execute(movie_id: number): Promise<Session[]> {
        const sessionRepository = AppDataSource.getRepository(Session);
        const sessions = await sessionRepository.find({
            where: { movie: { id: movie_id } },
            relations: ["movie", "ticket"]
        });
        
        if (sessions.length === 0) {
            throw new AppError("There are no sessions registered for this movie.", 400);
        }

        return sessions;
    }
}

export default ListSessionService;