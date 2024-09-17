import Session from "@database/entities/Session";
import { AppDataSource } from "@database/index";
import AppError from "@api/middlewares/AppError";

class ShowSessionService {
    public async getSessionById(
        id: number,
        movie_id: number,
    ): Promise<Session | null> {
        const sessionRepository = AppDataSource.getRepository(Session);

        const session = await sessionRepository.findOne({
            where: { id, movie: { id: movie_id } },
            relations: ["movie"],
        });
        console.log(session);

        if (!session) {
            throw new AppError("Session not found.", 404);
        }

        return session;
    }
}

export default ShowSessionService;
