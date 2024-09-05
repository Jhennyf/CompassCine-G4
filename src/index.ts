import "reflect-metadata";
import express from "express";
import "dotenv/config";

import "../src/database/index";
import MovieController from "../src/api/controllers/MovieController";

import movieRouter from "./routes/movies.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const movieController = new MovieController();

app.use(movieRouter)

// app.post("/", movieController.create);
// app.get("/", movieController.list);
// app.get("/:id", movieController.show);
// app.put("/:id", movieController.update);

app.listen(process.env.PORT_SERVER, () => {
    console.log(`[🤖] API: COMPASSCINE - ONLINE - PORTA: ${process.env.PORT_SERVER}`)
});
