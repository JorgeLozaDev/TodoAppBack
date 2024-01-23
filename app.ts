import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";


const app = express();
app.use(express.json());

// ROUTER
// import godsRouter from "./entities/gods/router";
import usersRouter from "./entities/users/router";

app.use(cors());
app.get("/", (Request, Response) => {
  Response.send("Healcheck: ok");
});
// app.use("/gods/", godsRouter);
app.use("/user/", usersRouter);
// app.use(errorHandler);

app.listen(3000, () => console.log("Servidor levantado en 3000"));
