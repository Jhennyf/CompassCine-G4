import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { MovieController } from './../api/controllers/MovieController';

const router = express.Router();
const movieController = new MovieController();


// Lista todos os filmes
router.get(
    "/movies",
    movieController.getAll    
);

// Buscar filme
router.get(
    "/movies/:id", 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().guid().required(),
        },
    }),
    movieController.getById
);

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
    movieController.post
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
    movieController.put
);

// Deletar filme
router.delete(
  "/movies/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
    movieController.delete
);

export default router;