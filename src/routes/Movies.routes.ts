import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import MovieController from './../api/controllers/MovieController';

const movieRoutes = express.Router();
const movieController = new MovieController();


// Lista todos os filmes
movieRoutes.get(
    "/movies",
    movieController.list  
);

// Buscar filme
movieRoutes.get(
    "/movies/:id", 
    // celebrate({
    //     [Segments.PARAMS]: {
    //         id: Joi.string().guid().required(),
    //     },
    // }),
    movieController.show
);

// Cadastrar filme
movieRoutes.post(
  "/movies",
//   celebrate({
//     [Segments.BODY]: {
//       name: Joi.string().required(),
//       description: Joi.string().required(),
//       actors: Joi.array().min(1).required(),
//       genre: Joi.string().required(),
//       release_date: Joi.date().required(),
//     },
//   }),
    movieController.create
);

// Atualizar filme
movieRoutes.put( 
  "/movies/:id",
//   celebrate({
//     [Segments.BODY]: {
//       name: Joi.string().required(),
//       description: Joi.string().required(),
//       actors: Joi.array().min(1).required(),
//       genre: Joi.string().required(),
//       release_date: Joi.date().required(),
//     },
//     [Segments.PARAMS]: {
//       id: Joi.number().integer().required(),
//     },
//   }),
    movieController.update
);

// Deletar filme
movieRoutes.delete(
  "/movies/:id",
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.number().integer().required(),
//     },
//   }),
    movieController.delete
);

export default movieRoutes;