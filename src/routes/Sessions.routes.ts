import express from "express";
import { celebrate, Joi, Segments } from "celebrate";
//import { SectionController } from "@api/controllers/SessionController";
import Session from "../models/SessionModel";
const router = express.Router();


// Cadastrar sessão
router.post(
  "/movies/:movie_id/sessions",
  celebrate({
    [Segments.BODY]: {
      room: Joi.string().required(),
      capacity: Joi.number().integer().required(),
      day: Joi.string().required(),
      time: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const session = new Session(request.body);
    await session.save();
    response.json(session);
  }
);

// Atualizar sessão
router.put(
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
  async (request, response) => {
    const session = await Session.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.json(session);
  }
);

// Deletar sessão
router.delete(
  "/movies/:movie_id/sessions/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  async (request, response) => {
    const session = await Session.findByIdAndDelete(request.params.id);
    response.json(session);
  }
);

export default router;