import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";

interface IParams {
    id: number;
}

class ShowMoviceService {
    public async execute({ id }: IParams): Promise<Movie | null> {
        const movieRepository = AppDataSource.getRepository(Movie);
    
        const customer = await movieRepository.findOne({
            where: {id},
        });
    
    
        return customer;
    }
}

export default ShowMoviceService;