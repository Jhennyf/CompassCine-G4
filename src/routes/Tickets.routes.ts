import express from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { TicketController } from "@api/controllers/TikcketsController";

const ticketRoutes = express.Router();
const ticketController = new TicketController();

// Cadastrar ticket
ticketRoutes.post(
  "/movies/:movie_id/sessions/:session_id/tickets",
  celebrate({
    [Segments.BODY]: {
      chair: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  ticketController.post
);

// Atualizar ticket
ticketRoutes.put(
  "/movies/:movie_id/sessions/:session_id/tickets/:id",
  celebrate({
    [Segments.BODY]: {
      chair: Joi.string().required(),
      value: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
    ticketController.put
);

// Deletar ticket
ticketRoutes.delete(
  "/movies/:movie_id/sessions/:session_id/tickets/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
    ticketController.delete
);

export default ticketRoutes;