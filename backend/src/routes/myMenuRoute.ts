import express from "express";
import multer from "multer";
import myMenuController from "../controller/myMenuController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { validateMyMenuRequest } from "../middleware/validation.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});

//api/my/menu
router.get(
    "/", 
    jwtCheck,
    jwtParse,
    myMenuController.getMyMenuItems
);

router.get(
    "/client", 
    jwtCheck,
    jwtParse,
    myMenuController.getClientMenuItems
);

router.post(
    "/",
    upload.single("imageFile"), 
    validateMyMenuRequest,
    jwtCheck,
    jwtParse,
    myMenuController.createMenuItem
);

router.put(
    "/",
    upload.single("imageFile"), 
    validateMyMenuRequest,
    jwtCheck,
    jwtParse,
    myMenuController.updateMenuItem
)

//api/my/menu/:id
router.get(
    "/:id",
    jwtCheck,
    jwtParse,
    myMenuController.getMenuItemById
);

router.patch(
    "/:id/availability",
    jwtCheck,
    jwtParse,
    myMenuController.updateMenuItemAvailability
);

export default router;