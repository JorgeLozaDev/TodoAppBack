import express from "express";
import { login, signIn } from "./controller";

const router = express.Router();

router.post("/addUser", signIn);
router.post("/login", login);

export default router;
