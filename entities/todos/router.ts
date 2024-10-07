import express from "express";
import { authMiddleware } from "../../middlewares/authMIddleware";
import { addTodo, getAllTodosUser } from "./controller";

const router = express.Router();

router.post("/addTodo", authMiddleware, addTodo);
router.get("/listTodos", authMiddleware, getAllTodosUser);

export default router;
