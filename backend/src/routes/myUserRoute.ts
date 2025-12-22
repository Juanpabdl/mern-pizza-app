import express from "express";
import myUserController from "../controller/myUserController.js";

const router = express.Router();

// api/my/user
router.post("/", myUserController.createUser);

export default router;