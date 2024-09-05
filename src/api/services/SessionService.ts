import { AppDataSource } from "../../database/index";
import Session from "../../database/entities/Session";

export class SessionService {
    private sessionRepository = AppDataSource.getRepository(Session);

    // Cadastrar sessão
    async createSession(session: Session) {
        try {
            return this.sessionRepository.save(session);
        } catch (error) {
            return error;
        }
    }
    // Buscar sessão por id
    async getSessionById(id: number) {
        const session = await this.sessionRepository.findOne(
            { where: { id } }
        );
        if (session == null) {
            throw new Error("Session not found");
        }

        return session;
    }
    // Buscar todas as sessões
    async getSessions() {
        return this.sessionRepository.find();
    }

    // Atualizar sessão
    async updateSession(id: number, session: Session) {
        return this.sessionRepository.update(id, session);
    }
    
    // Deletar sessão
    async deleteSession(id: number) {
        return this.sessionRepository.delete(id);
    }
}