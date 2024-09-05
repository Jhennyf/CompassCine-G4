import { AppDataSource } from "../../database/index";
import Session from "../../database/entities/Session";

export class SessionService {
    private sessionRepository = AppDataSource.getRepository(Session);

    async createSession(session: Session) {
        try {
            await this.checkSessionConflict(
                session.day.toISOString(),
                session.time,
                session.room,
            );

            return this.sessionRepository.save(session);
        } catch (error) {
            return error;
        }
    }

    // Buscar sessão por id
    async getSessionById(id: number) {
        const session = await this.sessionRepository.findOne({ where: { id } });
        if (session == null) {
            throw new Error("Session not found");
        }

        return session;
    }

    async getSessions() {
        return this.sessionRepository.find();
    }

    async updateSession(id: number, session: Session) {
        try {
            const existingSession = await this.getSessionById(id);

            await this.checkSessionConflict(session.day.toISOString(), session.time, session.room);

            return this.sessionRepository.update(id, session);
        } catch (error) {
            return error;
        }
    }

    async checkSessionConflict(day: string, time: string, room: string) {
        const dayDate = new Date(day);

        // Buscar todas as sessões daquela data
        const sessionsOnSameDay = await this.sessionRepository.find({
            where: { day: dayDate },
        });

        // Verificar se há sessões na mesma sala e horário
        const conflictingSession = sessionsOnSameDay.find(
            (session) => session.room === room && session.time === time,
        );

        if (conflictingSession) {
            throw new Error("Session already exists");
        }
    }
}
