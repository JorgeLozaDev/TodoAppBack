import express from "express";
import { authMiddleware } from "../../middlewares/authMIddleware";
import { addTodo } from "./controller";

const router = express.Router();

router.post("/addTodo", authMiddleware, addTodo);

export default router;
