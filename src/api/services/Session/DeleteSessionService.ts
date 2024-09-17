import Session from "@database/entities/Session";
import { AppDataSource } from "@database/index";
import AppError from "@api/middlewares/AppError";

interface IRequest {
    id: number;
    movie_id: number;
}

class DeleteSessionService {
    public async execute({ id, movie_id }: IRequest): Promise<void> {
        const sessionRepository = AppDataSource.getRepository(Session);

        const session = await sessionRepository.findOne({
            where: { id, movie: { id: movie_id } },
            relations: ["movie"],
        });

        if (!session) {
            throw new AppError("Session or Movie not found.", 404);
        }

        await sessionRepository.remove(session);
    }
}

export default DeleteSessionService;
