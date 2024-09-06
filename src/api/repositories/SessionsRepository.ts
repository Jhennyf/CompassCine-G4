import { EntityRepository, Repository } from "typeorm";
import Session from "@database/entities/Session";

@EntityRepository(Session)
class SessionsRepository extends Repository<Session> {
    public async findById(id: number): Promise<Session | null> {
        const session = await this.findOne({
            where: {
                id,
            },
        });

        return session;
    }

    public async findByDay(day: Date): Promise<Session | null> {
        const session = await this.findOne({
            where: {
                day,
            },
        });

        return session;
    }
}

export default SessionsRepository;
