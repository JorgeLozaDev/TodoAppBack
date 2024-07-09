import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
// ROUTER
// import godsRouter from "./entities/gods/router";
import usersRouter from "./entities/users/router";
import errorHandler from "./middlewares/errorHandler";

const app = express();
app.use(express.json());


app.use(
  cors() 
  //   {
  //   origin: "http://localhost:5173",
  //   methods: ["GET", "POST", "PUT", "DELETE"],
  //   credentials: true,
  // }
);
app.get("/", (Request, Response) => {
  Response.send("Healcheck: ok1"); 
});
// app.use("/gods/", godsRouter);
app.use("/user/", usersRouter);
app.use(errorHandler);

app.listen(3000, () => console.log("Servidor levantado en 3000"));
