import Ticket from '@database/entities/Ticket';
import Session from '@database/entities/Session';
import { EntityRepository, Repository } from 'typeorm';

interface IRequest {
    value: number;
    chair: string;
  }

  @EntityRepository(Ticket)
class TicketChairRepository extends Repository<Ticket> {
  public async findById(chair: string;): Promise<Ticket | undefined> {
    const sessionExist = this.findOne(session_id, {
      relations: ['session', 'ticket'],
    });

    return sessionExist;
  }
}

  export default TicketChairRepository;