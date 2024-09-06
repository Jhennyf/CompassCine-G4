import { DataSource, EntityRepository, Repository } from "typeorm";
import Movie from "@database/entities/Movie";

@EntityRepository(Movie)
class MoviesRepository extends Repository<Movie> {
    public async findByName(name: string): Promise<Movie | null> {
        const movie = await this.findOne({
            where: {
                name,
            },
        });

        return movie;
    }

    public async findById(id: number): Promise<Movie | null> {
        const movie = await this.findOne({
            where: {
                id,
            },
        });

        return movie;
    }
}

export default MoviesRepository;
