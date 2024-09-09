import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";
import AppError from "../../middlewares/AppError";

interface IParams {
    id: number;
}

interface ISession {
    id: number;
    movie_id: number;
    room: string;
    capacity: number;
    day: string;
    time: string;
}
interface ITicket {
    id: string;
    quantity: number;
}

interface IRequest {
    ticket: ITicket[];
    movie: ISession[];
}

class ShowMoviceService {
    public async execute({ id }: IParams): Promise<Movie | null> {
        const movieRepository = AppDataSource.getRepository(Movie);

        const movie = await movieRepository.findOne({
            where: { id },
            relations: ["session"],
        });

        if (!movie) {
            throw new AppError("Movie not found.");
        }

        return movie;
    }
}

export default ShowMoviceService;
