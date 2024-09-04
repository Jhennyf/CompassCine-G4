// Importações Necessárias
import express from "express";
import "dotenv/config";
import "express-async-errors";
import { errors } from "celebrate";
// import {ValidationError} from "@api/middlewares/ValidationError";

// Models

// Controllers

// Services

// Routes

// Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errors());
// app.use<ValidationError>();

app.listen(process.env.PORT_SERVER, () => {
    console.log(`App listening port ${process.env.PORT_SERVER}`);
});
