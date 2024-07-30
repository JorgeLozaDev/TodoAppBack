import express from "express";
import { getProfile, login, signIn, updateProfile } from "./controller";
import { authMiddleware } from "../../middlewares/authMIddleware";

const router = express.Router();

router.post("/addUser", signIn);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.put("/updateprofile", authMiddleware, updateProfile);

export default router;
