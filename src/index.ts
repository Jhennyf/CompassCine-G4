// Importações Necessárias
import "reflect-metadata";
import express from "express";
import "dotenv/config";
import "../src/database/index";
import { MovieController } from "../src/api/controllers/MovieController";

// Models

// Controllers

// Services

// Routes

// Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const movieController = new MovieController();

app.get("/", movieController.getAll);

app.listen(process.env.PORT_SERVER, () => {
    console.log(`App listening port ${process.env.PORT_SERVER}`);
});
