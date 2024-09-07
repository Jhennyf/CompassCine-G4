import "reflect-metadata";
import "express-async-errors"
import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { errors } from 'celebrate';
import swaggerUI from "swagger-ui-express";
import swaggerDocumentation from "../swagger.json"

import "../src/database/index";
import AppError from "./api/middlewares/AppError";

import movieRouter from "./routes/Movies.routes";
import sessionRoutes from "./routes/Session.routes";
import ticketRoutes from "./routes/Tickets.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', movieRouter)
app.use('/api', sessionRoutes)
app.use('/api', ticketRoutes)
app.use('/api/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation))

app.use(errors())

app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: `Error: ${error.statusCode}`,
                message: error.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    },
);

app.listen(process.env.PORT_SERVER, () => {
    // eslint-disable-next-line no-console
    console.log(`[🤖] API: COMPASSCINE - ONLINE - PORTA: ${process.env.PORT_SERVER}`)
});
