import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";

interface IParams {
    id: number;
}

class DeleteMovieService {
    public async execute({ id }: IParams): Promise<void> {
        const movieRepository = AppDataSource.getRepository(Movie);
    
        const movie = await movieRepository.findOne({
            where: {id}
        });

        if(!movie) {
            throw new Error("Movie is not found.")
        }

        await movieRepository.remove(movie);
    }
}

export default DeleteMovieService;