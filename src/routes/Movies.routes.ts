import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import MovieController from './../api/controllers/MovieController';

const movieRoutes = express.Router();
const movieController = new MovieController();


// List all Movies
movieRoutes.get(
    "/movies",
    movieController.list  
);

// Search a movie
movieRoutes.get(
    "/movies/:id", 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().guid().required(),
        },
    }),
    movieController.show
);

// Create a Movie
movieRoutes.post(
  "/movies",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      actors: Joi.array().min(1).required(),
      genre: Joi.string().required(),
      release_date: Joi.date().required(),
    },
  }),
    movieController.create
);

// Update a Movie
movieRoutes.put( 
  "/movies/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      actors: Joi.array().min(1).required(),
      genre: Joi.string().required(),
      release_date: Joi.date().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
    movieController.update
);

// Delete a Movie
movieRoutes.delete(
  "/movies/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
    movieController.delete
);

export default movieRoutes;