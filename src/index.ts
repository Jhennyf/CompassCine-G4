import "reflect-metadata";
import express from "express";
import "dotenv/config";

import "../src/database/index";
import MovieController from "../src/api/controllers/MovieController";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const movieController = new MovieController();

app.post("/", movieController.create);

app.listen(process.env.PORT_SERVER, () => {
    console.log(`[🤖] API: COMPASSCINE - ONLINE - PORTA: ${process.env.PORT_SERVER}`)
});
