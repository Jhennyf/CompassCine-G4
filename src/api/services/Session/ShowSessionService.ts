import Session from "../../../database/entities/Session";
import { AppDataSource } from "../../../database/";
import AppError from "../../middlewares/AppError";

class ShowSessionService {
<<<<<<< HEAD
    public async getSessionById(
        id: number,
        movie_id: number,
    ): Promise<Session | null> {
=======
    public async getSessionById(id: number, movie_id: number): Promise<Session | null> {
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6
        const sessionRepository = AppDataSource.getRepository(Session);

        const session = await sessionRepository.findOne({
            where: { id, movie: { id: movie_id } },
<<<<<<< HEAD
            relations: ["movie"],
=======
            relations: ["movie"]
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6
        });
        console.log(session);

        if (!session) {
            throw new AppError("Session not found.", 404);
        }

        return session;
    }
}

<<<<<<< HEAD
export default ShowSessionService;
=======
export default ShowSessionService;
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6
