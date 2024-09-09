import express from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { TicketController } from "@api/controllers/TikcketsController";

const ticketRoutes = express.Router();
const ticketController = new TicketController();

// creat ticket
ticketRoutes.post(
    "/movies/:movie_id/sessions/:session_id/tickets",
    celebrate({
        [Segments.PARAMS]: {
            movie_id: Joi.number().integer().required(),
            session_id: Joi.number().integer().required(),
        },
        [Segments.BODY]: {
            chair: Joi.string().required(),
            value: Joi.number().required(),
        },
    }),
    ticketController.post,
);

// update ticket
ticketRoutes.put(
    "/movies/:movie_id/sessions/:session_id/tickets/:id",
    celebrate({
        [Segments.PARAMS]: {
            movie_id: Joi.number().integer().required(),
            session_id: Joi.number().integer().required(),
            id: Joi.number().integer().required(),
        },
        [Segments.BODY]: {
            chair: Joi.string().required(),
            value: Joi.number().required(),
        },
    }),
    ticketController.put,
);

// Delete ticket
ticketRoutes.delete(
    "/movies/:movie_id/sessions/:session_id/tickets/:id",
    celebrate({
        [Segments.PARAMS]: {
            movie_id: Joi.number().integer().required(),
            session_id: Joi.number().integer().required(),
            id: Joi.number().integer().required(),
        },
    }),
    ticketController.delete,
);

export default ticketRoutes;