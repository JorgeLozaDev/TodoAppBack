import express from "express";
import { authMiddleware } from "../../middlewares/authMIddleware";
import { addTodo, deleteTodos, getAllTodosUser } from "./controller";

const router = express.Router();

router.post("/addTodo", authMiddleware, addTodo);
router.get("/listTodos", authMiddleware, getAllTodosUser);
router.delete("/deleteTodos", authMiddleware, deleteTodos);

export default router;
