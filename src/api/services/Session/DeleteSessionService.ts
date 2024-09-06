import Session from "../../../database/entities/Session";
import { AppDataSource } from "../../../database/";

interface IParams {
    id: number;
}

class DeleteSessionService {
    public async execute({ id }: IParams): Promise<void> {
        const sessionRepository = AppDataSource.getRepository(Session);
    
        const session = await sessionRepository.findOne({
            where: { id }
        });

        if (!session) {
            throw new Error("Session not found.");
        }

        await sessionRepository.remove(session);
    }
}

export default DeleteSessionService;