import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const CatDTO = z.object({
  name: z.string(),
  age: z.number(),
  breed: z.string(),
  isVaccinated: z.boolean(),
  color: z.string(),
});

const app = new Hono();

app.post("/", zValidator("json", CatDTO), (c) => c.json(c.req.valid("json")));

export default app;
