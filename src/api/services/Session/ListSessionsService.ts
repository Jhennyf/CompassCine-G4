import Session from "../../../database/entities/Session";
import { AppDataSource } from "../../../database/";
import AppError from "../../middlewares/AppError";

class ListSessionService {
    public async execute(movie_id: number): Promise<Session[]> {
        const sessionRepository = AppDataSource.getRepository(Session);
        const sessions = await sessionRepository.find({
            where: { movie: { id: movie_id } },
<<<<<<< HEAD
            relations: ["movie"]
        });
        
        if (sessions.length === 0) {
            throw new AppError("There are no sessions registered for this movie.");
=======
            relations: ["movie", "ticket"]
        });
        
        if (sessions.length === 0) {
            throw new AppError("There are no sessions registered for this movie.", 400);
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6
        }

        return sessions;
    }
}

export default ListSessionService;