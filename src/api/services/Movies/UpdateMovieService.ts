import Movie from "../../../database/entities/Movie";
import { AppDataSource } from "../../../database/";

interface IRequest {
    id: number;
    name: string;
    description: string;
    actors: string[];
    genre: string;
    release_date: string;
}

class UpdateMovieService {
    public async execute({ id, name, description, actors, genre, release_date }: IRequest): Promise<Movie | null> {
        const movieRepository = AppDataSource.getRepository(Movie);
        
        const movie = await movieRepository.findOneBy({id});
        if(!movie) {
            throw new Error("movie is not found.")
        }

        const movieExistsName = await movieRepository.findOneBy({name});

        if(movieExistsName && name !== movie.name) {
            throw new Error("movie is already.")
        }

        movie.name = name;
        movie.description = description;
        movie.actors = actors;
        movie.genre = genre;
        movie.release_date = release_date;

        await movieRepository.save(movie);
    
        return movie;

    }
}

export default UpdateMovieService;