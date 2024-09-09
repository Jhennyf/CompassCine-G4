import moment from "moment";
<<<<<<< HEAD

import Session from "../../../database/entities/Session";
import { AppDataSource } from "../../../database/";
import Movie from "../../../database/entities/Movie";
<<<<<<< HEAD
=======
import AppError from "../../middlewares/AppError";
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6
=======
import Session from "@database/entities/Session";
import Movie from "@database/entities/Movie";
import { AppDataSource } from "@database/index";
import AppError from "@api/middlewares/AppError";
>>>>>>> 33f9598a49405c89914e1b33b3e26262ff57c599

interface IRequest {
    room: string;
    capacity: number;
    day: string;
    time: string;
    movie_id: number;
}

class CreateSessionService {
    public async execute({ room, capacity, day, time, movie_id }: IRequest): Promise<Session> {
        const sessionRepository = AppDataSource.getRepository(Session);
        const movieRepository = AppDataSource.getRepository(Movie); 

        const movie = await movieRepository.findOne({ where: { id: movie_id } });

        if (!movie) {
            throw new AppError("Movie not found.", 404);
        }

        const sessionExists = await sessionRepository.findOne({
            where: { day, time, room }
        });

        if (sessionExists) {
            throw new AppError("Session already registered.", 400);
        }

<<<<<<< HEAD
        const movie = await movieRepository.findOne({ where: { id: movie_id } });

        if (!movie) {
<<<<<<< HEAD
            throw new Error("Movie not found.");
=======
            throw new AppError("Movie not found.", 404);
>>>>>>> 49be6567f712a184dde029a37ef1a7bcbc873ea6
        }
=======
        
>>>>>>> 33f9598a49405c89914e1b33b3e26262ff57c599

        const session = sessionRepository.create({ room, capacity, day, time, movie });
        await sessionRepository.save(session);

        session.day = moment(session.day).format("DD/MM/YYYY")

        return session;
    }
}

export default CreateSessionService;