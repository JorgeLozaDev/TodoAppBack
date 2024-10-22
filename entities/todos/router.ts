import express from "express";
import { authMiddleware } from "../../middlewares/authMIddleware";
import {
  addTodo,
  deleteTodos,
  getAllTodosUser,
  todoDetails,
  updateTodo,
} from "./controller";

const router = express.Router();

router.post("/addTodo", authMiddleware, addTodo);
router.get("/listTodos", authMiddleware, getAllTodosUser);
router.delete("/deleteTodos", authMiddleware, deleteTodos);

router.put("/updateTodo/:id", authMiddleware, updateTodo);
router.get("/todo/:id", authMiddleware, todoDetails);

export default router;
