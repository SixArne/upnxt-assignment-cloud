import http from "http";
import express from "express";
import { compute } from "./compute";
import { validate } from "./util/validate";

const app = express();

app.use(express.json());

app.post("/compute", (request, response) => {
  const game = request.body.game;

  try {
    validate(game);
    const score = compute(game);

    response.status(200).send(
        { score: score }
    )
  } catch (error) {
    response.status(400).send(
        { error: error}
    )
  }

});

export const createServer = () => http.createServer(app);
