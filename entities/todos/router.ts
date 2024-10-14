import express from "express";
import { authMiddleware } from "../../middlewares/authMIddleware";
import {
  addTodo,
  deleteTodos,
  getAllTodosUser,
  todoDetails,
} from "./controller";

const router = express.Router();

router.post("/addTodo", authMiddleware, addTodo);
router.get("/listTodos", authMiddleware, getAllTodosUser);
router.delete("/deleteTodos", authMiddleware, deleteTodos);

router.get("/todo/:id", authMiddleware, todoDetails);

export default router;
