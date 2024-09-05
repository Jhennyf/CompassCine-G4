import { Router, Response, Request } from "express";

const movieRouter = Router();

movieRouter.get("/movies", (request: Request, response: Response) => {
    response.json({ message: "Online" })
})

export default movieRouter;

