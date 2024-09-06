import "reflect-metadata";
import express from "express";
import "dotenv/config";
import { errors } from 'celebrate';

import "../src/database/index";

import movieRouter from "./routes/Movies.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', movieRouter)

app.use(errors())

app.listen(process.env.PORT_SERVER, () => {
    console.log(`[🤖] API: COMPASSCINE - ONLINE - PORTA: ${process.env.PORT_SERVER}`)
});
