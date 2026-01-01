import express from "express";
import myUserController from "../controller/myUserController.js";
import { jwtCheck } from "../middleware/auth.js";

const router = express.Router();

// api/my/user
router.post("/", jwtCheck, myUserController.createUser);

export default router;