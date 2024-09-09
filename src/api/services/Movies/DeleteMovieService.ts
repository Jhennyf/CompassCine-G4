import Movie from "@database/entities/Movie";
import { AppDataSource } from "@database/index";
import AppError from "@api/middlewares/AppError";

interface IParams {
    id: number;
}

class DeleteMovieService {
    public async execute({ id }: IParams): Promise<void> {
        const movieRepository = AppDataSource.getRepository(Movie);

        const movie = await movieRepository.findOne({
            where: { id }
        });

        if (!movie) {
            throw new AppError("Movie is not found.", 404)
        }

        await movieRepository.remove(movie);
    }
}

export default DeleteMovieService;