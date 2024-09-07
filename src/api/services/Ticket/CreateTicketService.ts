import Ticket from "../../../database/entities/Ticket";
import { AppDataSource } from "../../../database/";
import Session from "@database/entities/Session";

interface IRequest {
    value: number;
    chair: string;
}

interface IChairCount {
    total: number;
}

interface ILimitSession {
    capacity: number;
}

//conta o numero de cadeiras cadastradas
class CreateTicketService {
    async chairCount(): Promise<IChairCount[]> {
        const ticketRepository = AppDataSource.getRepository(Ticket);
        return ticketRepository
            .createQueryBuilder("ticket")
            .select("ticket.chair, COUNT(*) as total")
            .groupBy("ticket.chair")
            .getRawMany();
    }

    // async limitSession(): Promise<ILimitSession> {
    //     const sessionRepository = AppDataSource.getRepository(Session);
    //     return sessionRepository
    //         .createQueryBuilder("session")
    //         .select("session.sessionId, COUNT(*) as total")
    //         .groupBy("ticket.chair")
    //         .getRawMany();
    // }

    public async execute({ value, chair }: IRequest): Promise<Ticket> {
        const ticketRepository = AppDataSource.getRepository(Ticket);
        const sessionRepository = AppDataSource.getRepository(Session);

        // //conta o numero de cadeiras cadastradas
        // const chairCount = await ticketRepository.count({ chair });

        //confere o numero de cadeiras com a capacidade da sessão
        if (this.chairCount > sessionRepository.capacity) {
        const [chairCount] = await ticketRepository.findAndCount(chair)

        if(chairCount > sessionRepository.capacity){
            throw new Error("Sold out.");
        }

        //valida as cadeiras
        const chairExists = await ticketRepository.findOne({
            where: { chair },
        });

        if (chairExists === true) {
            throw new Error("Occupied chair.");
        }

        const ticket = ticketRepository.create({ value, chair });
        await ticketRepository.save(ticket);

        return ticket;
    }
}

export default CreateTicketService;
