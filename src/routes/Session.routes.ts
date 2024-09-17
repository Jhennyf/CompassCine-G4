import express from "express";
import { celebrate, Segments } from "celebrate";
import { SessionController } from "@api/controllers/SessionController";

import BaseJoi, { Extension, Root } from "joi";
import joiDate from "@joi/date";
const Joi = BaseJoi.extend(joiDate as unknown as Extension) as Root;

const sessionRoutes = express.Router();
const sessionController = new SessionController();

// Listar todas as sessões
sessionRoutes.get("/movies/:movie_id/sessions", sessionController.getAll);

// Buscar uma sessão específica
sessionRoutes.get(
    "/movies/:movie_id/sessions/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().required(),
            movie_id: Joi.number().integer().required(),
        },
    }),
    sessionController.getById,
);

// Cadastrar sessão
sessionRoutes.post(
    "/movies/:movie_id/sessions",
    celebrate({
        [Segments.PARAMS]: {
            movie_id: Joi.number().required(),
        },
        [Segments.BODY]: {
            room: Joi.string().required(),
            capacity: Joi.number().integer().required(),
            day: Joi.date().format("DD/MM/YYYY").required(),
            time: Joi.string().required(),
        },
    }),
    sessionController.post,
);

// Atualizar sessão
sessionRoutes.put(
    "/movies/:movie_id/sessions/:id",
    celebrate({
        [Segments.BODY]: {
            room: Joi.string().required(),
            capacity: Joi.number().integer().required(),
            day: Joi.date().format("DD/MM/YYYY").required(),
            time: Joi.string().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.number().integer().required(),
            movie_id: Joi.number().integer().required(),
        },
    }),
    sessionController.put,
);

// Deletar sessão
sessionRoutes.delete(
    "/movies/:movie_id/sessions/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().required(),
            movie_id: Joi.number().integer().required(),
        },
    }),
    sessionController.delete,
);

export default sessionRoutes;
