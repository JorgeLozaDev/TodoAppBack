import express from "express";
import { signIn } from "./controller";

const router = express.Router();

router.post("/addUser", signIn);

export default router;
