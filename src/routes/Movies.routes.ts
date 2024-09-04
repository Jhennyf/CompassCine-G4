import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
//import { MovieController } from '@api/controllers/MovieController';
import Movie from "../api/models/MovieModel";
const router = express.Router();


// Lista todos os filmes
router.get("/movies", async (request, response) => {
    const movies = await Movie.find();
    response.json(movies);
});

// Buscar filme
router.get("/movies/:id", async (request, response) => {
    const movie = await Movie.findById(request.params.id);  
    response.json(movie);
});

// Cadastrar filme
router.post(
  "/movies",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      actors: Joi.string().required(),
      genre: Joi.string().required(),
      release_date: Joi.date().required(),
    },
  }),
  async (request, response) => {
    const movie = new Movie(request.body);
    await movie.save();
    response.json(movie);
  }
);

// Atualizar filme
router.put(
  "/movies/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      actors: Joi.string().required(),
      genre: Joi.string().required(),
      release_date: Joi.date().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  async (request, response) => {
    const movie = await Movie.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.json(movie);
  }
);

// Deletar filme
router.delete(
  "/movies/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  async (request, response) => {
    const movie = await Movie.findByIdAndDelete(request.params.id);
    response.json(movie);
  }
);

export default router;