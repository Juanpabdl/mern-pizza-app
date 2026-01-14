import express from "express";
import myUserController from "../controller/myUserController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { validateMyUserRequest } from "../middleware/validation.js";

const router = express.Router();

// api/my/user
router.get("/", jwtCheck, jwtParse, myUserController.getUser);

router.post("/", jwtCheck, myUserController.createUser);

router.put("/", jwtCheck, jwtParse, validateMyUserRequest, myUserController.updateUser);

export default router;