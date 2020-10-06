import http from "http";
import express from "express";
import { compute } from "./compute";
import { validate } from "./util/validate";
import Database from "./database/Database";
import {uuid} from "uuidv4";

const app = express();

app.use(express.json());

app.post("/compute", (request, response) => {
  const game = request.body.game;

  try {
    validate(game);
    const score = compute(game);
    const id = uuid();

    const stmt = Database.createInstance().prepare(`INSERT INTO game VALUES (?, ?)`);
    stmt.run(id, score);
    stmt.finalize();

    response.status(200).send(
        {
          id: id,
          score: score
        }
    )
  } catch (error) {
    response.status(400).send(
        { error: error}
    )
  }
});

app.get("/history", (request, response) => {
  const { game } = request.query;

  try {
    const query = `SELECT * FROM game WHERE id = ?`;

    Database.createInstance().get(query, [game], (err, row) => {
      response.status(200).send(
          { id: row.id, score: row.score}
      )
    });

  } catch (error) {
    response.status(400).send(
        {message: 'entry not found'}
    )
  }
})

export const createServer = () => http.createServer(app);