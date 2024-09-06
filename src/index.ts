import "reflect-metadata";
import "express-async-errors"
import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { errors } from 'celebrate';

import "../src/database/index";
import AppError from "./api/middlewares/AppError";

import movieRouter from "./routes/Movies.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', movieRouter)
app.use(errors())

app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
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
    console.log(`[🤖] API: COMPASSCINE - ONLINE - PORTA: ${process.env.PORT_SERVER}`)
});
