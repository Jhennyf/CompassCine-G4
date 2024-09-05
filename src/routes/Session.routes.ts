import express from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { SectionController } from "../api/controllers/SessionController";

const sessionRoutes = express.Router();
const sessionController = new SectionController();

// Cadastrar sessão
sessionRoutes.post(
  "/movies/:movie_id/sessions",
  celebrate({
    [Segments.BODY]: {
      room: Joi.string().required(),
      capacity: Joi.number().integer().required(),
      day: Joi.string().required(),
      time: Joi.string().required(),
    },
  }),
    sessionController.post
);

// Atualizar sessão
sessionRoutes.put(
  "/movies/:movie_id/sessions/:id",
  celebrate({
    [Segments.BODY]: {
      room: Joi.string().required(),
      capacity: Joi.number().integer().required(),
      day: Joi.string().required(),
      time: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
    sessionController.put
);

// Deletar sessão
sessionRoutes.delete(
  "/movies/:movie_id/sessions/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
    sessionController.delete
);

export default sessionRoutes;