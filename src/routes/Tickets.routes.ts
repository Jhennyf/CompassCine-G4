import express from "express";
import { celebrate, Joi, Segments } from "celebrate";
const router = express.Router();

// Cadastrar ticket
router.post(
  "/movies/:movie_id/sessions/:session_id/tickets",
  celebrate({
    [Segments.BODY]: {
      chair: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  async (request, response) => {
    const ticket = new Ticket(request.body);
    await ticket.save();
    response.json(ticket);
  }
);

// Atualizar ticket
router.put(
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
  async (request, response) => {
    const ticket = await Ticket.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.json(ticket);
  }
);

// Deletar ticket
router.delete(
  "/movies/:movie_id/sessions/:session_id/tickets/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  async (request, response) => {
    const ticket = await Ticket.findByIdAndDelete(request.params.id);
    response.json(ticket);
  }
);

export default router;