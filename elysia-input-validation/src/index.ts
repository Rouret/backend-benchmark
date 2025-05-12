import { Elysia, t } from "elysia";


const CatDTO = t.Object({
  name: t.String(),
  age: t.Number(),
  breed: t.String(),
  isVaccinated: t.Boolean(),
  color: t.String(),
});

const app = new Elysia()
  .post("/", ({ body }) => body, {
    body: CatDTO,
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
